require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const Testimonial = require('./models/Testimonial');
const ContactMessage = require('./models/ContactMessage');
const AdminUser = require('./models/AdminUser');
const Showcase = require('./models/Showcase');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_in_production';

// ─── Email Configuration ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendInquiryAlert = async (msg) => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.NOTIFICATION_EMAIL) {
        console.log('ℹ️ Email notifications skipped (config missing)');
        return;
    }
    const mailOptions = {
        from: `"Uthsav Alerts" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFICATION_EMAIL,
        subject: `✨ New Inquiry: ${msg.name} (${msg.eventType || 'General'})`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #D4AF37; margin-bottom: 20px;">🎉 New Inquiry Received!</h2>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
                    <p><strong>Name:</strong> ${msg.name}</p>
                    <p><strong>Phone:</strong> ${msg.phone}</p>
                    <p><strong>Event:</strong> ${msg.eventType || 'Not specified'}</p>
                    <p><strong>Date:</strong> ${msg.eventDate ? new Date(msg.eventDate).toLocaleDateString() : 'TBD'}</p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap; font-style: italic;">${msg.message || 'No message provided.'}</p>
                </div>
            </div>
        `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Email alert sent to ${process.env.NOTIFICATION_EMAIL}`);
    } catch (err) {
        console.error('❌ Failed to send email alert:', err.message);
    }
};

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(cors()); // Allow all origins since frontend and backend are on different Render domains
app.use(express.json());

// ─── MongoDB: serverless-safe connection ─────────────────────────────────────
let cachedDb = null;

const connectDB = async () => {
    if (cachedDb && mongoose.connection.readyState === 1) {
        return cachedDb;
    }
    
    // Fail fast in serverless
    const db = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000, // 5 seconds instead of hanging for 300s
        socketTimeoutMS: 45000,
    });
    
    cachedDb = db;
    console.log('✅ MongoDB connected');
    return db;
};

// Connect on every request (safe — skips if already connected)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('DB connection error:', err.message);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// ─── JWT Auth Middleware ─────────────────────────────────────────────────────
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized — no token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized — invalid or expired token' });
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// AUTH ROUTES (public)
// ═══════════════════════════════════════════════════════════════════════════

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'Email and password are required' });
    try {
        const admin = await AdminUser.findOne({ email: email.toLowerCase().trim() });
        if (!admin) return res.status(401).json({ error: 'Invalid email or password' });
        const valid = await admin.comparePassword(password);
        if (!valid) return res.status(401).json({ error: 'Invalid email or password' });
        const token = jwt.sign(
            { id: admin._id, email: admin.email, name: admin.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/auth/me', requireAuth, async (req, res) => {
    try {
        const admin = await AdminUser.findById(req.admin.id).select('-password');
        if (!admin) return res.status(404).json({ error: 'Admin not found' });
        res.json({ admin });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/auth/change-password', requireAuth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
        return res.status(400).json({ error: 'Both current and new password are required' });
    if (newPassword.length < 6)
        return res.status(400).json({ error: 'New password must be at least 6 characters' });
    try {
        const admin = await AdminUser.findById(req.admin.id);
        const valid = await admin.comparePassword(currentPassword);
        if (!valid) return res.status(401).json({ error: 'Current password is incorrect' });
        admin.password = newPassword;
        await admin.save();
        res.json({ success: true, message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS ROUTES
// ═══════════════════════════════════════════════════════════════════════════

app.get('/api/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ order: 1, createdAt: 1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/testimonials', requireAuth, async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const testimonial = new Testimonial({ ...req.body, order: count });
        await testimonial.save();
        res.status(201).json(testimonial);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/testimonials/:id', requireAuth, async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        );
        if (!testimonial) return res.status(404).json({ error: 'Not found' });
        res.json(testimonial);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/testimonials/:id', requireAuth, async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) return res.status(404).json({ error: 'Not found' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ═══════════════════════════════════════════════════════════════════════════
// CONTACT MESSAGES ROUTES
// ═══════════════════════════════════════════════════════════════════════════

app.get('/api/messages', requireAuth, async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const message = new ContactMessage(req.body);
        await message.save();
        sendInquiryAlert(message);
        res.status(201).json(message);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.patch('/api/messages/:id/read', requireAuth, async (req, res) => {
    try {
        const message = await ContactMessage.findByIdAndUpdate(
            req.params.id, { read: true }, { new: true }
        );
        if (!message) return res.status(404).json({ error: 'Not found' });
        res.json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/messages/:id', requireAuth, async (req, res) => {
    try {
        const message = await ContactMessage.findByIdAndDelete(req.params.id);
        if (!message) return res.status(404).json({ error: 'Not found' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/messages', requireAuth, async (req, res) => {
    try {
        await ContactMessage.deleteMany({});
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// SHOWCASE ROUTES
// ═══════════════════════════════════════════════════════════════════════════

app.get('/api/showcases/:category', async (req, res) => {
    try {
        const sc = await Showcase.find({ category: req.params.category }).sort({ order: 1, createdAt: -1 });
        res.json(sc);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/showcases', requireAuth, async (req, res) => {
    try {
        const sc = await Showcase.find().sort({ category: 1, order: 1 });
        res.json(sc);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/showcases', requireAuth, async (req, res) => {
    try {
        const count = await Showcase.countDocuments({ category: req.body.category });
        const sc = new Showcase({ ...req.body, order: count });
        await sc.save();
        res.status(201).json(sc);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/showcases/:id', requireAuth, async (req, res) => {
    try {
        const sc = await Showcase.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        );
        if (!sc) return res.status(404).json({ error: 'Not found' });
        res.json(sc);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/showcases/:id', requireAuth, async (req, res) => {
    try {
        const sc = await Showcase.findByIdAndDelete(req.params.id);
        if (!sc) return res.status(404).json({ error: 'Not found' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ─── Health check ─────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// ─── Export for serverless / local listen ────────────────────────────────
module.exports = app;

// Only start the HTTP server when running locally (not on Vercel)
if (require.main === module) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 API server running at http://localhost:${PORT}`);
    });
}

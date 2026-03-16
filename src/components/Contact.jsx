import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, MapPin, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react';
import { createContactMessage } from '../lib/data';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '', email: '', phone: '', eventType: '', eventDate: '', message: ''
    });

    const inputClasses = "w-full bg-white/40 border border-[#D4AF37]/30 rounded-lg px-5 py-3 text-[#4A2E2A] font-light placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300";

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.phone || !form.email) return;
        setLoading(true);
        try {
            await createContactMessage(form);
            setSubmitted(true);
            setForm({ name: '', email: '', phone: '', eventType: '', eventDate: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            console.error('Failed to submit:', err);
            alert('Failed to send your inquiry. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-28 relative overflow-hidden" id="contact" ref={ref} style={{
            background: 'linear-gradient(135deg, rgba(217, 194, 240, 0.25) 0%, rgba(248, 215, 232, 0.25) 50%, rgba(253, 230, 220, 0.25) 100%)'
        }}>
            {/* Decorative elements */}
            <div className="absolute right-0 top-1/2 w-96 h-96 rounded-full opacity-8 pointer-events-none -translate-y-1/2" style={{
                background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)'
            }} />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-5 gap-12">

                    {/* Contact Info (Left) */}
                    <div className="lg:col-span-2 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            className="mb-6"
                        >
                            <span className="text-[#D4AF37] text-sm font-medium tracking-widest">GET IN TOUCH</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl font-serif text-[#4A2E2A] mb-6"
                        >
                            Let's Create <span className="text-[#D4AF37]">Something Beautiful</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-gray-700 text-lg font-light mb-12"
                        >
                            Reach out to us to start your premium digital invitation journey. We'll guide you through every step.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-5"
                        >
                            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#D4AF37]/20 bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B68A2E] flex items-center justify-center rounded-full text-white">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-[#D4AF37] uppercase tracking-widest">Email</p>
                                    <p className="font-light text-[#4A2E2A]">uthsavinvites@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#D4AF37]/20 bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B68A2E] flex items-center justify-center rounded-full text-white">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-[#D4AF37] uppercase tracking-widest">Call</p>
                                    <p className="font-light text-[#4A2E2A]">+91 7386376302</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#D4AF37]/20 bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B68A2E] flex items-center justify-center rounded-full text-white">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-[#D4AF37] uppercase tracking-widest">Studio</p>
                                    <p className="font-light text-[#4A2E2A]">Hyderabad, India</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Form (Right) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:col-span-3 premium-card premium-card-lavender"
                    >
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-4">
                                <CheckCircle size={56} className="text-[#D4AF37]" />
                                <h3 className="text-2xl font-serif text-[#4A2E2A]">Inquiry Sent!</h3>
                                <p className="text-gray-700 font-light max-w-xs">Thank you! We've received your message and will reach out to you shortly.</p>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-[#4A2E2A] mb-2">Name <span className="text-[#D4AF37]">*</span></label>
                                        <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClasses} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#4A2E2A] mb-2">Email <span className="text-[#D4AF37]">*</span></label>
                                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClasses} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#4A2E2A] mb-2">Phone <span className="text-[#D4AF37]">*</span></label>
                                        <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 XXXXXXXXXX" className={inputClasses} required />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-[#4A2E2A] mb-2">Event Type</label>
                                        <select name="eventType" value={form.eventType} onChange={handleChange} className={`${inputClasses} appearance-none cursor-pointer`}>
                                            <option value="">Select your event</option>
                                            <option value="wedding">Wedding</option>
                                            <option value="housewarming">Housewarming</option>
                                            <option value="birthday">Birthday</option>
                                            <option value="baby-shower">Baby Shower</option>
                                            <option value="engagement">Engagement</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#4A2E2A] mb-2">Event Date</label>
                                        <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange} className={inputClasses} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#4A2E2A] mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your event and design preferences..."
                                        className={`${inputClasses} resize-none`}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-gold-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <><Loader2 size={20} className="animate-spin" /> Sending...</>
                                    ) : (
                                        <>Send Inquiry <Send size={20} className="transition-transform" /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Contact;


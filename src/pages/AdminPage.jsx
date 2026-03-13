import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, MessageSquare, Plus, Trash2, Edit3, Save, X,
    Star, LogIn, LogOut, Eye, EyeOff, RefreshCw, ChevronDown,
    Loader2, Lock, Mail, ShieldCheck, KeyRound
} from 'lucide-react';
import {
    login as apiLogin, logout as apiLogout, getMe,
    getTestimonials, createTestimonial, updateTestimonial,
    deleteTestimonial, resetTestimonials,
    getContactMessages, deleteContactMessage, clearAllMessages, markMessageRead,
    changePassword as apiChangePassword, getToken,
    getShowcases, createShowcase, updateShowcase, deleteShowcase
} from '../lib/data';
import { Image as ImageIcon, ExternalLink, Filter } from 'lucide-react';

// ── Star Rating Input ────────────────────────────────────────────────────────
const StarInput = ({ value, onChange }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} type="button" onClick={() => onChange(s)}
                className={`text-2xl transition-transform hover:scale-110 ${s <= value ? 'text-[#D4AF37]' : 'text-zinc-600'}`}>
                ★
            </button>
        ))}
    </div>
);

const emptyForm = () => ({
    id: '', name: '', occasion: '', rating: 5,
    description: '', avatarUrl: '', emoji: '💍',
});

const EMOJI_OPTIONS = ['💍', '🏡', '🎂', '🍼', '🎉', '💐', '🥂', '🎊', '🙏', '✨'];
const EVENT_OPTIONS = [
    'Wedding Invitation', 'Housewarming Ceremony', 'Birthday Celebration',
    'Baby Shower Invitation', 'Engagement Ceremony', 'Anniversary Celebration', 'Other'
];

const inp = "w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-transparent transition-all";

// ── Change Password Modal ────────────────────────────────────────────────────
function ChangePasswordModal({ onClose }) {
    const [form, setForm] = useState({ current: '', next: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPw, setShowPw] = useState(false);

    const handle = async (e) => {
        e.preventDefault();
        setError('');
        if (form.next !== form.confirm) return setError('New passwords do not match.');
        if (form.next.length < 6) return setError('Password must be at least 6 characters.');
        setLoading(true);
        try {
            await apiChangePassword(form.current, form.next);
            setSuccess(true);
            setTimeout(onClose, 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-7 shadow-2xl"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                    <X size={18} />
                </button>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                        <KeyRound size={18} className="text-[#D4AF37]" />
                    </div>
                    <div>
                        <h3 className="font-serif text-lg text-white leading-none">Change Password</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">Update your admin password</p>
                    </div>
                </div>

                {success ? (
                    <div className="text-center py-6">
                        <ShieldCheck size={40} className="text-emerald-400 mx-auto mb-3" />
                        <p className="text-emerald-400 font-sans font-semibold">Password updated!</p>
                    </div>
                ) : (
                    <form onSubmit={handle} className="space-y-4">
                        {[
                            { label: 'Current Password', key: 'current' },
                            { label: 'New Password', key: 'next' },
                            { label: 'Confirm New Password', key: 'confirm' },
                        ].map(({ label, key }) => (
                            <div key={key}>
                                <label className="text-xs text-zinc-400 uppercase tracking-widest mb-1.5 block">{label}</label>
                                <div className="relative">
                                    <input
                                        type={showPw ? 'text' : 'password'}
                                        value={form[key]}
                                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                        className={`${inp} pr-10`}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setShowPw(v => !v)}
                            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
                        >
                            {showPw ? <EyeOff size={12} /> : <Eye size={12} />}
                            {showPw ? 'Hide passwords' : 'Show passwords'}
                        </button>
                        {error && <p className="text-red-400 text-sm flex items-center gap-2"><X size={14} />{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#D4AF37] text-zinc-950 font-bold py-2.5 rounded-xl hover:bg-[#c9a227] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                            {loading ? <><Loader2 size={16} className="animate-spin" /> Updating...</> : 'Update Password'}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}

// ── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
    // Auth state
    const [authed, setAuthed] = useState(false);
    const [authLoading, setAuthLoading] = useState(true); // checking stored token
    const [admin, setAdmin] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwVisible, setPwVisible] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [showChangePw, setShowChangePw] = useState(false);

    // Data state
    const [tab, setTab] = useState('testimonials');
    const [testimonials, setTestimonials] = useState([]);
    const [messages, setMessages] = useState([]);
    const [showcases, setShowcases] = useState([]);
    const [activeSCat, setActiveSCat] = useState('wedding-invitations');
    const [scForm, setSCForm] = useState({ name: '', description: '', image: '', link: '', category: 'wedding-invitations' });
    const [editingSC, setEditingSC] = useState(null);
    const [dataLoading, setDataLoading] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyForm());
    const [saved, setSaved] = useState(false);
    const [expandedMsg, setExpandedMsg] = useState(null);
    const [toast, setToast] = useState(null); // { message, type }

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // ── Auto-login from stored token ───────────────────────────────────────
    useEffect(() => {
        const token = getToken();
        if (!token) { setAuthLoading(false); return; }
        getMe()
            .then(({ admin: a }) => { setAdmin(a); setAuthed(true); })
            .catch(() => { /* Token expired/invalid — stay logged out */ })
            .finally(() => setAuthLoading(false));
    }, []);

    // ── Load data once authenticated ───────────────────────────────────────
    useEffect(() => {
        if (!authed) return;
        refreshData();
    }, [authed]);

    // ── Login ──────────────────────────────────────────────────────────────
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoginLoading(true);
        try {
            const data = await apiLogin(email, password);
            setAdmin(data.admin);
            setAuthed(true);
            refreshData(); // Refresh data after successful login
        } catch (err) {
            setLoginError(err.message || 'Invalid email or password');
        } finally {
            setLoginLoading(false);
        }
    };

    const handleLogout = () => {
        apiLogout();
        setAuthed(false);
        setAdmin(null);
        setEmail('');
        setPassword('');
    };

    // ── Testimonial CRUD ───────────────────────────────────────────────────
    const startNew = () => {
        setForm({ ...emptyForm(), id: `new-${Date.now()}` });
        setEditing('new');
    };

    const startEdit = (t) => { setForm({ ...t }); setEditing(t._id); };
    const cancelEdit = () => { setEditing(null); setForm(emptyForm()); };

    const saveTestimonialFn = async () => {
        if (!form.name || !form.description) return;
        try {
            let updated;
            if (editing === 'new') {
                const { id, ...data } = form;
                const created = await createTestimonial(data);
                updated = [...testimonials, created];
            } else {
                const { _id, __v, createdAt, updatedAt, id, ...data } = form;
                const savedT = await updateTestimonial(_id || editing, data);
                updated = testimonials.map(t => (t._id === savedT._id ? savedT : t));
            }
            setTestimonials(updated);
            window.dispatchEvent(new Event('testimonialsUpdated'));
            setEditing(null);
            setForm(emptyForm());
            showToast(editing === 'new' ? 'Testimonial added!' : 'Testimonial updated!');
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const deleteTestimonialFn = async (id) => {
        if (!confirm('Delete this testimonial?')) return;
        try {
            await deleteTestimonial(id);
            const updated = testimonials.filter(t => (t._id || t.id) !== id);
            setTestimonials(updated);
            window.dispatchEvent(new Event('testimonialsUpdated'));
            showToast('Testimonial deleted');
        } catch (err) { showToast(err.message, 'error'); }
    };

    const resetToDefaults = async () => {
        if (!confirm('Reset all testimonials to defaults?')) return;
        try {
            const defaults = await resetTestimonials();
            setTestimonials(defaults);
            window.dispatchEvent(new Event('testimonialsUpdated'));
            showToast('Reset to defaults successfully');
        } catch (err) { showToast(err.message, 'error'); }
    };

    // ── Showcases ────────────────────────────────────────────────────────
    const handleSCImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setSCForm(prev => ({ ...prev, image: reader.result }));
        reader.readAsDataURL(file);
    };

    const saveShowcase = async (e) => {
        e.preventDefault();
        try {
            if (editingSC) {
                await updateShowcase(editingSC, scForm);
                showToast('Showcase updated successfully');
            } else {
                await createShowcase(scForm);
                showToast('Showcase created successfully');
            }
            setSCForm({ name: '', description: '', image: '', link: '', category: activeSCat });
            setEditingSC(null);
            refreshData();
            setTab('showcases'); // Go back to showcases list after saving
        } catch (err) { showToast(err.message, 'error'); }
    };

    const removeShowcase = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await deleteShowcase(id);
            showToast('Deleted successfully');
            refreshData();
        } catch (err) { showToast(err.message, 'error'); }
    };

    const startEditSC = (sc) => {
        setEditingSC(sc._id);
        setSCForm({ ...sc });
        setTab('showcases-form');
    };

    const categories = [
        { id: 'wedding-invitations', label: 'Wedding' },
        { id: 'housewarming-invitations', label: 'Housewarming' },
        { id: 'birthday-invitations', label: 'Birthday' },
        { id: 'baby-shower-invitations', label: 'Baby Shower' },
        { id: 'engagement-invitations', label: 'Engagement' },
        { id: 'naming-ceremony', label: 'Naming Ceremony' }
    ];

    // Fetch data
    const refreshData = async () => {
        setDataLoading(true);
        try {
            const [t, m, s] = await Promise.all([
                getTestimonials(),
                getContactMessages(),
                getShowcases()
            ]);
            setTestimonials(t);
            setMessages(m);
            setShowcases(s);
        } catch (err) { console.error('Refresh fail:', err); showToast(err.message, 'error'); }
        finally { setDataLoading(false); }
    };

    // ── Messages ───────────────────────────────────────────────────────────
    const deleteMessage = async (id) => {
        try {
            await deleteContactMessage(id);
            setMessages(prev => prev.filter(m => (m._id || m.id) !== id));
            showToast('Message deleted');
        } catch (err) { showToast(err.message, 'error'); }
    };

    const clearAll = async () => {
        if (!confirm('Clear ALL contact inquiries?')) return;
        try {
            await clearAllMessages();
            setMessages([]);
            showToast('All messages cleared');
        } catch (err) { showToast(err.message, 'error'); }
    };

    const refreshMessages = () => {
        getContactMessages().then(setMessages).catch(err => showToast(err.message, 'error'));
    };

    const toggleMessage = async (id) => {
        const msg = messages.find(m => m._id === id);
        if (!msg) return;

        const isOpening = expandedMsg !== id;
        setExpandedMsg(isOpening ? id : null);

        if (isOpening && !msg.read) {
            try {
                const updated = await markMessageRead(id);
                setMessages(prev => prev.map(m => m._id === id ? updated : m));
            } catch (err) { console.error('Failed to mark read:', err); }
        }
    };

    const flashSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

    const unreadCount = messages.filter(m => !m.read).length;

    // ── Loading spinner (checking stored token) ────────────────────────────
    if (authLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <Loader2 size={32} className="text-[#D4AF37] animate-spin" />
            </div>
        );
    }

    // ── Login Screen ───────────────────────────────────────────────────────
    if (!authed) {
        return (
            <div className="relative min-h-screen bg-zinc-950 flex items-center justify-center px-4 overflow-hidden">
                {/* Background glows */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 w-full max-w-md"
                >
                    {/* Card */}
                    <div className="bg-zinc-900 border border-white/10 rounded-3xl p-10 shadow-2xl">
                        {/* Logo mark */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck size={30} className="text-[#D4AF37]" />
                            </div>
                            <h1 className="text-3xl font-serif text-white mb-1">Admin Login</h1>
                            <p className="text-zinc-500 text-sm font-sans">Uthsav Invites — Secure Access</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="text-xs text-zinc-400 uppercase tracking-widest mb-1.5 block">Email</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="admin@uthsav.com"
                                        className={`${inp} pl-10`}
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-xs text-zinc-400 uppercase tracking-widest mb-1.5 block">Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                    <input
                                        type={pwVisible ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`${inp} pl-10 pr-12`}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button type="button" onClick={() => setPwVisible(v => !v)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                                        {pwVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {loginError && (
                                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                    <X size={14} className="text-red-400 flex-shrink-0" />
                                    <p className="text-red-400 text-sm">{loginError}</p>
                                </div>
                            )}

                            <button type="submit" disabled={loginLoading}
                                className="w-full bg-[#D4AF37] text-zinc-950 font-bold py-3 rounded-xl hover:bg-[#c9a227] transition-colors font-sans tracking-wide flex items-center justify-center gap-2 mt-2 disabled:opacity-60">
                                {loginLoading
                                    ? <><Loader2 size={18} className="animate-spin" /> Signing in...</>
                                    : <><LogIn size={18} /> Sign In</>}
                            </button>
                        </form>

                    </div>
                </motion.div>
            </div>
        );
    }

    // ── Dashboard ──────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans">
            <AnimatePresence>
                {showChangePw && <ChangePasswordModal onClose={() => setShowChangePw(false)} />}
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                        className={`fixed bottom-8 left-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-md ${toast.type === 'error'
                                ? 'bg-red-500/10 border-red-500/20 text-red-400'
                                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            }`}
                    >
                        {toast.type === 'error' ? <X size={18} /> : <ShieldCheck size={18} />}
                        <span className="font-medium">{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Topbar */}
            <div className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur-xl border-b border-white/5 px-6 flex items-center justify-between" style={{ height: '60px' }}>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#D4AF37] text-xs font-serif font-bold">U</span>
                        </div>
                        <div>
                            <span className="font-serif text-base text-white leading-none block">Uthsav</span>
                            <span className="text-[10px] text-zinc-500 uppercase tracking-widest leading-none">Admin Panel</span>
                        </div>
                    </div>
                    {saved && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                            className="text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 ml-2"
                        >
                            ✓ Saved
                        </motion.span>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    {admin && (
                        <span className="text-sm text-zinc-400 hidden sm:block">{admin.email}</span>
                    )}
                    <button onClick={() => setShowChangePw(true)}
                        className="flex items-center gap-1.5 text-zinc-500 hover:text-white text-xs transition-colors border border-white/5 hover:border-white/20 px-3 py-1.5 rounded-lg">
                        <KeyRound size={13} /> Password
                    </button>
                    <button onClick={handleLogout}
                        className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm transition-colors">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                            <Star size={22} className="text-[#D4AF37]" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold font-serif">{testimonials.length}</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-widest">Testimonials</div>
                        </div>
                    </div>
                    <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center">
                            <ImageIcon size={22} className="text-purple-400" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold font-serif">{showcases.length}</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-widest">Showcases</div>
                        </div>
                    </div>
                    <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center relative">
                            <MessageSquare size={22} className="text-indigo-400" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <div>
                            <div className="text-2xl font-bold font-serif">{messages.length}</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-widest">
                                {unreadCount > 0 ? <span className="text-red-400">{unreadCount} Unread</span> : 'Inquiries'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-white/5">
                    {[
                        { id: 'testimonials', label: 'Testimonials', icon: Star },
                        { id: 'showcases', label: 'Live Showcases', icon: ImageIcon },
                        { id: 'messages', label: 'Inquiries', icon: MessageSquare, count: messages.filter(m => !m.read).length }
                    ].map(({ id, label, icon: Icon, count }) => (
                        <button
                            key={id}
                            onClick={() => setTab(id)}
                            className={`flex items-center gap-2 px-6 py-3 font-serif transition-all relative ${tab === id || tab === id + '-form' ? 'text-[#D4AF37]' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            <Icon size={18} />
                            {label}
                            {count > 0 && (
                                <span className="bg-[#D4AF37] text-zinc-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                                    {count}
                                </span>
                            )}
                            {(tab === id || tab === id + '-form') && (
                                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
                            )}
                        </button>
                    ))}
                </div>

                {dataLoading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={28} className="text-[#D4AF37] animate-spin" />
                    </div>
                )}

                {/* ═══ TESTIMONIALS TAB ═══ */}
                {!dataLoading && tab === 'testimonials' && (
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-serif">Manage Testimonials</h2>
                            <div className="flex gap-2">
                                <button onClick={resetToDefaults}
                                    className="flex items-center gap-2 px-4 py-2 text-sm bg-zinc-800 border border-white/10 text-zinc-400 rounded-xl hover:text-white hover:border-white/30 transition-all">
                                    <RefreshCw size={14} /> Reset Defaults
                                </button>
                                <button onClick={startNew}
                                    className="flex items-center gap-2 px-4 py-2 text-sm bg-[#D4AF37] text-zinc-950 font-semibold rounded-xl hover:bg-[#c9a227] transition-colors">
                                    <Plus size={16} /> Add New
                                </button>
                            </div>
                        </div>

                        {/* Add/Edit Form */}
                        <AnimatePresence>
                            {editing && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                    className="bg-zinc-900 border border-[#D4AF37]/30 rounded-2xl p-6 mb-6 shadow-2xl">
                                    <h3 className="font-serif text-xl mb-5">
                                        {editing === 'new' ? '✨ Add New Testimonial' : '✏️ Edit Testimonial'}
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-zinc-400 uppercase tracking-widest mb-1.5 block">Name *</label>
                                            <input className={inp} value={form.name}
                                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                                placeholder="e.g. Priya & Arjun" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-zinc-400 uppercase tracking-widest mb-1.5 block">Occasion</label>
                                            <select className={`${inp} bg-zinc-800`} value={form.occasion}
                                                onChange={e => setForm(f => ({ ...f, occasion: e.target.value }))}>
                                                <option value="">Select occasion</option>
                                                {EVENT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs text-zinc-400 uppercase tracking-widest mb-1.5 block">Avatar URL</label>
                                            <input className={inp} value={form.avatarUrl}
                                                onChange={e => setForm(f => ({ ...f, avatarUrl: e.target.value }))}
                                                placeholder="https://..." />
                                        </div>
                                        <div>
                                            <label className="text-xs text-zinc-400 uppercase tracking-widest mb-1.5 block">Emoji</label>
                                            <div className="flex flex-wrap gap-2">
                                                {EMOJI_OPTIONS.map(em => (
                                                    <button key={em} type="button"
                                                        onClick={() => setForm(f => ({ ...f, emoji: em }))}
                                                        className={`text-xl p-1.5 rounded-lg border transition-all ${form.emoji === em ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/10 bg-zinc-800 hover:border-white/30'}`}>
                                                        {em}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-xs text-zinc-400 uppercase tracking-widest mb-1.5 block">Rating</label>
                                            <StarInput value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-xs text-zinc-400 uppercase tracking-widest mb-1.5 block">Review *</label>
                                            <textarea className={`${inp} resize-none`} rows={4} value={form.description}
                                                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                                placeholder="Write the testimonial..." />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-5">
                                        <button onClick={saveTestimonialFn}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-zinc-950 font-semibold rounded-xl hover:bg-[#c9a227] transition-colors text-sm">
                                            <Save size={15} /> Save
                                        </button>
                                        <button onClick={cancelEdit}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 text-zinc-300 rounded-xl hover:bg-zinc-700 transition-colors text-sm">
                                            <X size={15} /> Cancel
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Testimonial List */}
                        <div className="space-y-3">
                            {testimonials.length === 0 && (
                                <div className="text-center py-16 text-zinc-600 border border-white/5 rounded-2xl bg-zinc-900">
                                    <Star size={40} className="mx-auto mb-3 opacity-30" />
                                    <p>No testimonials yet. Add your first one!</p>
                                </div>
                            )}
                            {testimonials.map((t) => (
                                <motion.div key={t._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="bg-zinc-900 border border-white/5 rounded-2xl p-5 flex items-start gap-4 hover:border-white/10 transition-all group">
                                    {t.avatarUrl
                                        ? <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-white/10 flex-shrink-0" />
                                        : <div className="w-12 h-12 rounded-full bg-zinc-700 border border-white/10 flex items-center justify-center text-[#D4AF37] font-serif font-bold flex-shrink-0">
                                            {t.name.slice(0, 1)}
                                        </div>}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <span className="font-serif font-semibold">{t.name}</span>
                                            <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">{t.emoji} {t.occasion}</span>
                                        </div>
                                        <div className="flex gap-0.5 mb-2">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <span key={i} className={`text-sm ${i < t.rating ? 'text-[#D4AF37]' : 'text-zinc-700'}`}>★</span>
                                            ))}
                                        </div>
                                        <p className="text-zinc-400 text-sm line-clamp-2">{t.description}</p>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => startEdit(t)}
                                            className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-[#D4AF37] hover:bg-zinc-700 transition-all">
                                            <Edit3 size={15} />
                                        </button>
                                        <button onClick={() => deleteTestimonialFn(t._id)}
                                            className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 transition-all">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Showcases List ──────────────────────────────────────────────── */}
                {!dataLoading && tab === 'showcases' && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900 border border-white/5 p-4 rounded-2xl">
                            <div className="flex flex-wrap gap-2">
                                {categories.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => setActiveSCat(c.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeSCat === c.id ? 'bg-[#D4AF37] text-zinc-950' : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'}`}
                                    >
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => { setEditingSC(null); setSCForm({ name: '', description: '', image: '', link: '', category: activeSCat }); setTab('showcases-form'); }}
                                className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-zinc-950 transition-all"
                            >
                                <Plus size={16} /> New Showcase
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {showcases.filter(s => s.category === activeSCat).map(s => (
                                <motion.div
                                    key={s._id}
                                    layout
                                    className="bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden group hover:border-[#D4AF37]/30 transition-all"
                                >
                                    <div className="aspect-video relative overflow-hidden bg-zinc-900">
                                        {s.image ? (
                                            <img src={s.image} alt={s.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-zinc-800"><ImageIcon size={48} /></div>
                                        )}
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => startEditSC(s)} className="p-2 bg-zinc-900/80 rounded-lg text-white hover:text-[#D4AF37]"><Edit3 size={14} /></button>
                                            <button onClick={() => removeShowcase(s._id)} className="p-2 bg-red-500/80 rounded-lg text-white hover:bg-red-500"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-serif text-white mb-1">{s.name}</h4>
                                        <p className="text-zinc-500 text-xs line-clamp-2 mb-3">{s.description}</p>
                                        {s.link && s.link !== '#' && (
                                            <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
                                                <ExternalLink size={10} /> Live Site
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {showcases.filter(s => s.category === activeSCat).length === 0 && (
                                <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                                    <p className="text-zinc-500 font-serif">No showcases in this category yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── Showcase Form ──────────────────────────────────────────────── */}
                {!dataLoading && tab === 'showcases-form' && (
                    <div className="max-w-2xl mx-auto bg-zinc-950 border border-white/10 rounded-3xl p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-serif text-white">{editingSC ? 'Edit' : 'Add'} Showcase</h3>
                            <button onClick={() => setTab('showcases')} className="p-2 text-zinc-500 hover:text-white"><X size={20} /></button>
                        </div>
                        <form onSubmit={saveShowcase} className="space-y-6">
                            <div>
                                <label className="text-xs text-zinc-500 uppercase tracking-widest mb-2 block">Category</label>
                                <select
                                    value={scForm.category}
                                    onChange={e => setSCForm({ ...scForm, category: e.target.value })}
                                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] selection:bg-[#D4AF37] transition-all"
                                >
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs text-zinc-500 uppercase tracking-widest mb-2 block">Project Name</label>
                                <input
                                    type="text"
                                    value={scForm.name}
                                    onChange={e => setSCForm({ ...scForm, name: e.target.value })}
                                    placeholder="e.g. Rahul & Neha's Wedding"
                                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none transition-all placeholder:text-zinc-700"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs text-zinc-500 uppercase tracking-widest mb-2 block">Image (Upload & Store in DB)</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/5 group">
                                        {scForm.image ? (
                                            <img src={scForm.image} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-zinc-700">
                                                <ImageIcon size={32} className="mb-2" />
                                                <span className="text-[10px]">Preview</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleSCImage}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center text-xs text-zinc-500 space-y-2">
                                        <p>Upload a high-quality image of the website.</p>
                                        <p className="text-[#D4AF37]/60 italic font-mono">Max 10MB (Stored as Base64)</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-zinc-500 uppercase tracking-widest mb-2 block">Description</label>
                                <textarea
                                    value={scForm.description}
                                    onChange={e => setSCForm({ ...scForm, description: e.target.value })}
                                    rows={3}
                                    placeholder="Briefly describe the theme and features..."
                                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none transition-all placeholder:text-zinc-700 resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs text-zinc-500 uppercase tracking-widest mb-2 block">Live URL (Optional)</label>
                                <input
                                    type="url"
                                    value={scForm.link}
                                    onChange={e => setSCForm({ ...scForm, link: e.target.value })}
                                    placeholder="https://beckyandtom.com"
                                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none transition-all placeholder:text-zinc-700"
                                />
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#D4AF37] text-zinc-950 font-bold py-3 rounded-xl hover:bg-[#c9a227] transition-all flex items-center justify-center gap-2"
                                >
                                    <Save size={18} /> {editingSC ? 'Save Changes' : 'Create Showcase'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTab('showcases')}
                                    className="flex-1 bg-zinc-900 text-white font-bold py-3 rounded-xl hover:bg-zinc-800 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* ═══ MESSAGES TAB ═══ */}
                {!dataLoading && tab === 'messages' && (
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-serif">Contact Inquiries</h2>
                            <div className="flex gap-2">
                                <button onClick={refreshMessages}
                                    className="flex items-center gap-2 px-4 py-2 text-sm bg-zinc-800 border border-white/10 text-zinc-400 rounded-xl hover:text-white hover:border-white/30 transition-all">
                                    <RefreshCw size={14} /> Refresh
                                </button>
                                {messages.length > 0 && (
                                    <button onClick={clearAll}
                                        className="flex items-center gap-2 px-4 py-2 text-sm bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-all">
                                        <Trash2 size={14} /> Clear All
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            {messages.length === 0 && (
                                <div className="text-center py-16 text-zinc-600 border border-white/5 rounded-2xl bg-zinc-900">
                                    <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
                                    <p>No inquiries yet.</p>
                                </div>
                            )}
                            {messages.map((msg) => (
                                <motion.div key={msg._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className={`bg-zinc-900 border rounded-2xl overflow-hidden transition-all group ${!msg.read ? 'border-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.05)]' : 'border-white/5 hover:border-white/10'}`}>
                                    <div className="p-5 flex items-start gap-4 cursor-pointer"
                                        onClick={() => toggleMessage(msg._id)}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${!msg.read ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30' : 'bg-indigo-500/10 border border-indigo-500/20'}`}>
                                            <Users size={18} className={!msg.read ? 'text-[#D4AF37]' : 'text-indigo-400'} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 flex-wrap mb-1">
                                                <span className="font-semibold">{msg.name}</span>
                                                {!msg.read && <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-2 py-0.5 rounded-full uppercase tracking-widest">New</span>}
                                                <span className="text-xs text-zinc-500">{msg.phone}</span>
                                                {msg.eventType && <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full capitalize">{msg.eventType}</span>}
                                                {msg.eventDate && <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                                                    {new Date(msg.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </span>}
                                            </div>
                                            <p className="text-zinc-500 text-xs">
                                                {new Date(msg.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <ChevronDown size={16} className={`text-zinc-600 transition-transform ${expandedMsg === msg._id ? 'rotate-180' : ''}`} />
                                            <button onClick={e => { e.stopPropagation(); deleteMessage(msg._id); }}
                                                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100">
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedMsg === msg._id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden">
                                                <div className="px-5 pb-5">
                                                    <div className="border-t border-white/5 pt-4">
                                                        {msg.message ? (
                                                            <>
                                                                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Message</p>
                                                                <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                                            </>
                                                        ) : (
                                                            <p className="text-zinc-600 text-sm italic">No message provided.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

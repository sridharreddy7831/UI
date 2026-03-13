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
        name: '', phone: '', eventType: '', eventDate: '', message: ''
    });

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white font-sans placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-transparent transition-all duration-300 backdrop-blur-md";

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.phone) return;
        setLoading(true);
        try {
            await createContactMessage(form);
            setSubmitted(true);
            setForm({ name: '', phone: '', eventType: '', eventDate: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            console.error('Failed to submit:', err);
            alert('Failed to send your inquiry. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden border-t border-white/5" id="contact" ref={ref}>
            {/* Soft background glow */}
            <div className="absolute left-0 top-1/2 w-[600px] h-[600px] bg-[#D4AF37] rounded-full filter blur-[100px] opacity-10 -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-5 gap-16">

                    {/* Contact Info (Left) */}
                    <div className="lg:col-span-2 flex flex-col justify-center font-sans">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl font-serif text-white mb-6"
                        >
                            Let's Create <span className="text-[#D4AF37] italic">Something Beautiful</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-zinc-400 text-lg mb-12"
                        >
                            Reach out to us to start discussing your premium digital invitation. We'll guide you through every step of the process.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 shadow-sm hover:shadow-md hover:border-white/30 transition-all backdrop-blur-md">
                                <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full text-[#D4AF37] border border-white/10">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Email Us</p>
                                    <p className="font-serif text-lg text-white">uthsavinvites@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 shadow-sm hover:shadow-md hover:border-white/30 transition-all backdrop-blur-md">
                                <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full text-[#D4AF37] border border-white/10">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Call Us</p>
                                    <p className="font-serif text-lg text-white">+91 7386376302</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 shadow-sm hover:shadow-md hover:border-white/30 transition-all backdrop-blur-md">
                                <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full text-[#D4AF37] border border-white/10">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Studio</p>
                                    <p className="font-serif text-lg text-white">Hyderabad, India</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Form (Right) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:col-span-3 bg-white/5 backdrop-blur-2xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10"
                    >
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-4">
                                <CheckCircle size={56} className="text-[#D4AF37]" />
                                <h3 className="text-2xl font-serif text-white">Inquiry Sent!</h3>
                                <p className="text-zinc-400 font-sans max-w-xs">Thank you! We've received your message and will reach out to you shortly.</p>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Name <span className="text-[#D4AF37]">*</span></label>
                                        <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClasses} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Phone <span className="text-[#D4AF37]">*</span></label>
                                        <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Your phone number" className={inputClasses} required />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Event Type</label>
                                        <select name="eventType" value={form.eventType} onChange={handleChange} className={`${inputClasses} appearance-none bg-zinc-900 border-white/10`}>
                                            <option value="">Select Event</option>
                                            <option value="wedding">Wedding</option>
                                            <option value="housewarming">Housewarming</option>
                                            <option value="birthday">Birthday</option>
                                            <option value="baby-shower">Baby Shower</option>
                                            <option value="engagement">Engagement</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Event Date</label>
                                        <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange} className={`${inputClasses} [&::-webkit-calendar-picker-indicator]:filter-invert`} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">Message</label>
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
                                    className="w-full relative group bg-white/5 border border-white/10 text-white rounded-xl py-4 font-bold text-lg overflow-hidden shadow-lg hover:border-[#D4AF37]/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10 flex items-center gap-2 font-sans tracking-wide">
                                        {loading ? (
                                            <><Loader2 size={20} className="animate-spin" /> Sending...</>
                                        ) : (
                                            <>Send Inquiry <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform group-hover:text-[#D4AF37]" /></>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
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


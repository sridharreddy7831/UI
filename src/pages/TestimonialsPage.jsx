import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Loader2, Quote } from 'lucide-react';
import { getTestimonials } from '../lib/data';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Testimonials | Uthsav Invitations';

        getTestimonials()
            .then(setTestimonials)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#FFF8F2', color: '#4A2E2A' }}>
            <Navbar />

            {/* Hero */}
            <section className="relative pt-40 pb-20 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)' }} />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(248, 215, 232, 0.15)' }} />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <p className="uppercase tracking-[0.3em] text-sm font-medium mb-4" style={{ color: '#D4AF37', fontFamily: 'var(--font-sans)' }}>Love Stories Shared</p>
                    <h1 className="text-5xl md:text-7xl mb-6 leading-tight" style={{ fontFamily: 'var(--font-serif)', color: '#4A2E2A' }}>
                        What Our <span className="italic" style={{ color: '#D4AF37' }}>Families</span> Say
                    </h1>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: '#6B5B5B', fontFamily: 'var(--font-sans)', fontWeight: 300 }}>
                        Real families, real celebrations — hear what our clients say about their Uthsav experience.
                    </p>
                </motion.div>
            </section>

            {/* Testimonials Grid */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={40} className="animate-spin" style={{ color: '#D4AF37' }} />
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="text-center py-20">
                        <Star size={48} className="mx-auto mb-4" style={{ color: '#D4AF37', opacity: 0.3 }} />
                        <p className="italic" style={{ color: '#6B5B5B', fontFamily: 'var(--font-serif)' }}>No testimonials yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t._id || i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.6 }}
                                className="group relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2"
                                style={{
                                    backgroundColor: '#FFF8F2',
                                    border: '1.5px solid rgba(212, 175, 55, 0.2)',
                                    boxShadow: '0 10px 40px rgba(212, 175, 55, 0.08)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.15)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(212, 175, 55, 0.08)';
                                }}
                            >
                                {/* Glow on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                                    style={{ background: 'linear-gradient(to bottom, rgba(212, 175, 55, 0.05), transparent)' }} />

                                <div className="relative z-10">
                                    {/* Quote icon */}
                                    <Quote size={32} className="mb-4" style={{ color: 'rgba(212, 175, 55, 0.25)' }} />

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: 5 }).map((_, si) => (
                                            <Star
                                                key={si}
                                                size={16}
                                                className={si < t.rating ? 'fill-current' : ''}
                                                style={{ color: si < t.rating ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)' }}
                                            />
                                        ))}
                                    </div>

                                    {/* Badge */}
                                    <span className="text-xs font-medium px-3 py-1 rounded-full tracking-wide inline-block mb-4"
                                        style={{
                                            backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                            color: '#B68A2E',
                                            border: '1px solid rgba(212, 175, 55, 0.2)',
                                            fontFamily: 'var(--font-sans)',
                                        }}>
                                        {t.emoji} {t.occasion}
                                    </span>

                                    {/* Quote text */}
                                    <blockquote className="text-base leading-relaxed italic mb-6" style={{ color: '#6B5B5B', fontFamily: 'var(--font-sans)', fontWeight: 300 }}>
                                        "{t.description}"
                                    </blockquote>

                                    {/* Avatar */}
                                    <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.15)' }}>
                                        <Avatar className="!size-12" style={{ border: '1.5px solid rgba(212, 175, 55, 0.3)' }}>
                                            <AvatarImage src={t.avatarUrl} alt={t.name} />
                                            <AvatarFallback style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37', fontFamily: 'var(--font-serif)' }}>
                                                {t.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <span className="block text-lg font-semibold leading-tight" style={{ fontFamily: 'var(--font-serif)', color: '#4A2E2A' }}>
                                                {t.name}
                                            </span>
                                            <span className="block text-xs mt-0.5 uppercase tracking-wider" style={{ color: '#B68A2E', fontFamily: 'var(--font-sans)' }}>
                                                Uthsav Client
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default TestimonialsPage;

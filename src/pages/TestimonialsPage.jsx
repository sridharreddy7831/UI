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
        <div className="bg-zinc-950 text-white min-h-screen font-sans">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-40 pb-20 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/8 rounded-full blur-3xl" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm font-medium mb-4">Love Stories Shared</p>
                    <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
                        What Our <span className="text-[#D4AF37] italic">Families</span> Say
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                        Real families, real celebrations — hear what our clients say about their Uthsav experience.
                    </p>
                </motion.div>
            </section>

            {/* Testimonials Grid */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={40} className="animate-spin text-[#D4AF37]" />
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="text-center py-20">
                        <Star size={48} className="mx-auto mb-4 text-zinc-700" />
                        <p className="text-zinc-500 font-serif italic">No testimonials yet.</p>
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
                                className="group relative bg-zinc-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:border-[#D4AF37]/30 hover:-translate-y-2 transition-all duration-500"
                            >
                                {/* Glow on hover */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                                <div className="relative z-10">
                                    {/* Quote icon */}
                                    <Quote size={32} className="text-[#D4AF37]/20 mb-4" />

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: 5 }).map((_, si) => (
                                            <Star
                                                key={si}
                                                size={16}
                                                className={si < t.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-zinc-700'}
                                            />
                                        ))}
                                    </div>

                                    {/* Badge */}
                                    <span className="text-xs font-medium bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-3 py-1 rounded-full font-sans tracking-wide inline-block mb-4">
                                        {t.emoji} {t.occasion}
                                    </span>

                                    {/* Quote text */}
                                    <blockquote className="text-zinc-300 text-base font-sans leading-relaxed italic mb-6">
                                        "{t.description}"
                                    </blockquote>

                                    {/* Avatar */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                        <Avatar className="!size-12 border border-[#D4AF37]/20 ring-1 ring-[#D4AF37]/10">
                                            <AvatarImage src={t.avatarUrl} alt={t.name} />
                                            <AvatarFallback className="bg-zinc-800 text-[#D4AF37] font-serif">
                                                {t.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <span className="block text-white font-serif text-lg font-semibold leading-tight">
                                                {t.name}
                                            </span>
                                            <span className="block text-zinc-500 text-xs font-sans mt-0.5 uppercase tracking-wider">
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

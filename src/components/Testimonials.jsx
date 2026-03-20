import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { getTestimonials } from '../lib/data';
import { ContainerScroll, CardsContainer, CardTransformed, ReviewStars } from './ui/animated-cards-stack';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    const fetchTestimonials = () =>
        getTestimonials()
            .then(data => {
                // Ensure we only show the absolute latest 5 stories for maximum impact
                setTestimonials(data.slice(-5).reverse());
            })
            .catch(console.error);

    useEffect(() => {
        fetchTestimonials();
        window.addEventListener('testimonialsUpdated', fetchTestimonials);
        return () => window.removeEventListener('testimonialsUpdated', fetchTestimonials);
    }, []);

    if (!testimonials.length) return null;

    return (
        <section
            className="relative bg-transparent overflow-visible"
            id="testimonials"
            style={{
                background: 'linear-gradient(135deg, rgba(253, 230, 220, 0.4) 0%, rgba(217, 194, 240, 0.2) 50%, rgba(255, 248, 242, 0.5) 100%)'
            }}
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

            <ContainerScroll className="h-[250vh] w-full">
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10 pt-16">
                    
                        {/* ── LEFT: Static Premium Info ── */}
                        <div className="space-y-10">
                            <div>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-[#D4AF37] uppercase tracking-[0.2em] font-medium text-sm mb-4"
                                >
                                    Cherished Moments
                                </motion.p>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4A2E2A] leading-tight mb-6"
                                >
                                    Words From Our <span className="text-[#D4AF37] italic">Happy Families</span>
                                </motion.h2>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.7 }}
                                className="premium-card premium-card-blush rounded-3xl p-8 shadow-sm"
                            >
                                <p className="text-gray-700 font-light text-lg leading-relaxed italic border-l-2 border-[#D4AF37] pl-6 py-2">
                                    "Every celebration deserves an introduction as beautiful as the moment itself. We craft digital invitations that make your guests feel the magic before the event begins."
                                </p>
                                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#D4AF37]/20">
                                    <img src="/logo.png" alt="Uthsav Studio" className="h-10 w-auto object-contain drop-shadow-md" />
                                    <div>
                                        <span className="block text-[#D4AF37] text-sm uppercase tracking-widest font-bold">Uthsav Studio</span>
                                        <span className="block text-gray-500 text-xs tracking-wider">PREMIUM DESIGNS</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-3 gap-4 lg:gap-6">
                                {[
                                    { value: "500+", label: "Events" },
                                    { value: "99%", label: "Satisfaction" },
                                    { value: "24hr", label: "Delivery" },
                                ].map((stat, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        className="premium-card premium-card-lavender rounded-2xl p-4 md:p-6 text-center shadow-sm"
                                    >
                                        <div className="text-xl md:text-3xl font-serif font-black text-[#D4AF37] drop-shadow-sm">{stat.value}</div>
                                        <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest font-semibold mt-2">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* ── RIGHT: Dynamic Floating Smooth Stack ── */}
                        <div className="relative h-[450px] md:h-[500px] w-full flex items-center justify-center">
                            <CardsContainer className="mx-auto size-full max-w-[340px] md:max-w-[400px]">
                                {testimonials.map((test, index) => (
                                    <CardTransformed
                                        key={test._id || index}
                                        arrayLength={testimonials.length}
                                        index={index + 1}
                                        variant="light"
                                    >
                                        {/* Rating Badge */}
                                        <div className="w-full flex items-center justify-between">
                                            <ReviewStars rating={test.rating} className="text-[#D4AF37]" />
                                            <span className="text-xs font-semibold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full tracking-wider shadow-sm">
                                                {test.emoji} {test.occasion}
                                            </span>
                                        </div>

                                        {/* Body Quote */}
                                        <blockquote className="w-full text-center text-gray-700 text-lg md:text-xl font-serif leading-relaxed italic py-4">
                                            "{test.description}"
                                        </blockquote>

                                        {/* Profile Footer */}
                                        <div className="w-full flex items-center gap-4 pt-4 border-t border-[#D4AF37]/20 mt-2">
                                            <Avatar className="h-14 w-14 border-2 border-[#D4AF37]/40 ring-4 ring-[#D4AF37]/10 shadow-lg">
                                                <AvatarImage src={test.avatarUrl} alt={test.name} className="object-cover" />
                                                <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#B68A2E] text-white font-serif font-black text-lg">
                                                    {test.name ? test.name.split(" ").map(n => n[0]).join("").slice(0, 2) : '?'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="text-left">
                                                <span className="block text-[#4A2E2A] font-serif text-xl font-semibold tracking-wide">
                                                    {test.name}
                                                </span>
                                                <span className="block text-gray-500 text-[10px] font-bold mt-1 uppercase tracking-[0.2em]">
                                                    Verified Client
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Ambient Card Glow for extreme luxury finish */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D4AF37]/5 to-transparent rounded-[2rem] pointer-events-none" />
                                    </CardTransformed>
                                ))}
                            </CardsContainer>
                        </div>

                    </div>
                </div>
            </ContainerScroll>
        </section>
    );
};

export default Testimonials;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { getTestimonials } from '../lib/data';
import { ContainerScroll, CardsContainer, CardTransformed, ReviewStars } from './ui/animated-cards-stack';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTestimonials = () =>
        getTestimonials()
            .then(data => {
                // Ensure we only show the absolute latest 5 stories for maximum impact
                setTestimonials(data.slice(-5).reverse());
            })
            .catch(console.error)
            .finally(() => setLoading(false));

    useEffect(() => {
        fetchTestimonials();
        window.addEventListener('testimonialsUpdated', fetchTestimonials);
        return () => window.removeEventListener('testimonialsUpdated', fetchTestimonials);
    }, []);

    if (loading) return (
        <section id="testimonials" className="relative py-24 overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(253, 230, 220, 0.4) 0%, rgba(217, 194, 240, 0.2) 50%, rgba(255, 248, 242, 0.5) 100%)'
        }}>
            <div className="container mx-auto px-6 flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-4 text-center opacity-50">
                    <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
                    <p className="text-[#4A2E2A] font-serif text-lg">Loading cherished moments…</p>
                </div>
            </div>
        </section>
    );

    if (testimonials.length === 0) return null; // Hide section if no testimonials

    const premiumInfoBlock = (
        <div className="space-y-8 md:space-y-10">
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
                className="premium-card premium-card-blush rounded-3xl p-6 md:p-8 shadow-sm"
            >
                <p className="text-gray-700 font-light text-base md:text-lg leading-relaxed italic border-l-2 border-[#D4AF37] pl-4 md:pl-6 py-2">
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
            <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 w-full">
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
                        className="premium-card premium-card-lavender rounded-xl md:rounded-2xl p-3 md:p-6 text-center shadow-sm"
                    >
                        <div className="text-lg md:text-3xl font-serif font-black text-[#D4AF37] drop-shadow-sm">{stat.value}</div>
                        <div className="text-gray-500 text-[9px] md:text-xs uppercase tracking-widest font-semibold mt-1 md:mt-2">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );

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

            {/* ====== DESKTOP LAYOUT (Sticky Parallax Stack) ====== */}
            <div className="hidden md:block">
                <ContainerScroll className="h-[250vh] w-full">
                    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                        <div className="w-full max-w-7xl mx-auto px-12 grid grid-cols-2 gap-24 items-center relative z-10 pt-16">
                        
                            {premiumInfoBlock}

                            {/* ── RIGHT: Dynamic Floating Smooth Stack ── */}
                            <div className="relative h-[500px] w-full flex items-center justify-center">
                                <CardsContainer className="mx-auto size-full max-w-[400px]">
                                    {testimonials.map((test, index) => (
                                        <CardTransformed
                                            key={test._id || index}
                                            arrayLength={testimonials.length}
                                            index={index + 1}
                                            variant="light"
                                        >
                                            <CardInnerContent test={test} />
                                        </CardTransformed>
                                    ))}
                                </CardsContainer>
                            </div>

                        </div>
                    </div>
                </ContainerScroll>
            </div>

            {/* ====== MOBILE LAYOUT (Smooth Upward Card Flow) ====== */}
            {/* Resolves crashing constraints by restoring native vertical scaling purely for mobile */}
            <div className="block md:hidden container mx-auto px-6 py-16 relative z-10 overflow-hidden">
                {premiumInfoBlock}

                <div className="mt-16 flex flex-col items-center gap-8 w-full relative">
                    {testimonials.map((test, index) => (
                        <motion.div
                            key={test._id || index}
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
                            className="w-full relative flex flex-col items-center justify-center gap-6 rounded-[2rem] border border-[#D4AF37]/40 bg-white/95 p-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] backdrop-blur-md"
                        >
                            <CardInnerContent test={test} />
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
};

// Extracted inner layout of the actual card so it flawlessly renders exactly the same on Desktop 3D Stack and Mobile Vertical Flow
const CardInnerContent = ({ test }) => (
    <>
        {/* Rating Badge */}
        <div className="w-full flex items-center justify-between relative z-10">
            <ReviewStars rating={test.rating} className="text-[#D4AF37]" />
            <span className="text-xs font-semibold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full tracking-wider shadow-sm">
                {test.emoji} {test.occasion}
            </span>
        </div>

        {/* Body Quote */}
        <blockquote className="w-full text-center text-gray-700 text-lg md:text-xl font-serif leading-relaxed italic py-4 relative z-10">
            "{test.description}"
        </blockquote>

        {/* Profile Footer */}
        <div className="w-full flex items-center gap-4 pt-4 border-t border-[#D4AF37]/20 mt-2 relative z-10">
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
    </>
);

export default Testimonials;

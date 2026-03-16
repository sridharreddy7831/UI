import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ContainerScroll,
    CardsContainer,
    CardTransformed,
    ReviewStars,
} from './ui/animated-cards-stack';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { getTestimonials } from '../lib/data';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    const fetchTestimonials = () =>
        getTestimonials().then(setTestimonials).catch(console.error);

    useEffect(() => {
        fetchTestimonials();
        window.addEventListener('testimonialsUpdated', fetchTestimonials);
        return () => window.removeEventListener('testimonialsUpdated', fetchTestimonials);
    }, []);

    if (!testimonials.length) return null;

    return (
        <section
            className="relative overflow-hidden"
            id="testimonials"
            style={{
                background: 'linear-gradient(135deg, rgba(253, 230, 220, 0.4) 0%, rgba(212, 175, 55, 0.05) 50%, rgba(255, 248, 242, 0.6) 100%)'
            }}
        >
            {/* ── Section header ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12 text-center relative z-10">
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
                    className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4A2E2A] leading-tight"
                >
                    Words From Our <span className="text-[#D4AF37]">Happy Families</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-700 text-lg max-w-2xl mx-auto mt-4 font-light"
                >
                    Real families, real celebrations — hear what our clients say about their Uthsav experience.
                </motion.p>
            </div>

            {/* ── Scroll-driven card stack ── */}
            <ContainerScroll className="h-[350vh] w-full">
                {/* This sticky panel stays in the viewport while you scroll */}
                <div className="sticky top-0 left-0 h-screen w-full flex flex-col justify-center overflow-hidden">
                    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT — static brand info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8 hidden lg:block"
                        >
                            <div className="premium-card premium-card-blush">
                                <p className="text-gray-700 font-light text-lg leading-relaxed italic">
                                    "Every celebration deserves an introduction as beautiful as the moment itself. We craft digital invitations that make your guests feel the magic before the event begins."
                                </p>
                                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[#D4AF37]/20">
                                    <img
                                        src="/logo.png"
                                        alt="Uthsav"
                                        className="h-8 w-auto object-contain opacity-80"
                                    />
                                    <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-medium">
                                        Uthsav Studio
                                    </span>
                                </div>
                            </div>

                            {/* Quick stats */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { value: "500+", label: "Events" },
                                    { value: "99%", label: "Satisfaction" },
                                    { value: "24hr", label: "Delivery" },
                                ].map((stat, i) => (
                                    <div key={i} className="premium-card premium-card-lavender text-center">
                                        <div className="text-2xl font-serif font-bold text-[#D4AF37]">{stat.value}</div>
                                        <div className="text-gray-600 text-xs uppercase tracking-widest font-medium mt-1">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-gray-600 text-sm font-light flex items-center gap-2">
                                <span className="text-[#D4AF37]">↓</span>
                                Scroll to reveal each story
                            </p>
                        </motion.div>

                        {/* RIGHT — animated cards */}
                        <div className="flex items-center justify-center -mb-20 md:mb-0 w-full overflow-hidden">
                            <CardsContainer
                                className="relative w-[300px] sm:w-[360px] max-w-[90vw]"
                                style={{ height: "460px" }}
                            >
                                {testimonials.map((testimonial, index) => (
                                    <CardTransformed
                                        key={testimonial._id || index}
                                        arrayLength={testimonials.length}
                                        index={index}
                                        variant="gold"
                                        role="article"
                                        incrementRotation={(index - 2) * -3}
                                    >
                                        {/* Stars + badge */}
                                        <div className="w-full flex items-center justify-between flex-wrap gap-2">
                                            <ReviewStars
                                                rating={testimonial.rating}
                                                className="text-[#D4AF37]"
                                            />
                                            <span className="text-xs font-medium bg-[#D4AF37]/15 text-[#B68A2E] border border-[#D4AF37]/30 px-3 py-1 rounded-full tracking-wide">
                                                {testimonial.emoji} {testimonial.occasion}
                                            </span>
                                        </div>

                                        {/* Quote */}
                                        <div className="flex-1 flex items-center">
                                            <blockquote className="text-gray-700 text-base font-light leading-relaxed text-center italic">
                                                "{testimonial.description}"
                                            </blockquote>
                                        </div>

                                        {/* Avatar row */}
                                        <div className="w-full flex items-center gap-4 pt-4 border-t border-[#D4AF37]/20">
                                            <Avatar className="!size-12 border border-[#D4AF37]/30 ring-1 ring-[#D4AF37]/15">
                                                <AvatarImage
                                                    src={testimonial.avatarUrl}
                                                    alt={`Portrait of ${testimonial.name}`}
                                                />
                                                <AvatarFallback className="bg-[#F8D7E8] text-[#B68A2E] font-serif font-bold">
                                                    {testimonial.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <span className="block text-[#4A2E2A] font-serif text-lg font-semibold leading-tight">
                                                    {testimonial.name}
                                                </span>
                                                <span className="block text-gray-600 text-xs font-medium mt-0.5 uppercase tracking-wider">
                                                    Client
                                                </span>
                                            </div>
                                        </div>
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

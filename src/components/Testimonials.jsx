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
            className="bg-zinc-950 relative border-t border-white/5"
            id="testimonials"
        >
            {/* Background glows */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/8 rounded-full mix-blend-screen filter blur-[120px] opacity-30 -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full mix-blend-screen filter blur-[100px] opacity-20 translate-x-1/4 translate-y-1/4 pointer-events-none" />

            {/* ── Section header ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-4 text-center relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[#D4AF37] uppercase tracking-[0.2em] font-sans font-medium text-sm mb-4"
                >
                    Love Stories Shared
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight"
                >
                    Words From Our{" "}
                    <span className="text-[#D4AF37] italic">Happy Families</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-zinc-400 text-lg max-w-2xl mx-auto mt-4 font-sans"
                >
                    Real families, real celebrations — hear what our clients say about their Uthsav experience.
                </motion.p>
            </div>

            {/* ── Scroll-driven card stack ──
                ContainerScroll MUST be full-width and very tall so the inner
                sticky panel locks in position while cards peel one by one.    */}
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
                            <div className="glass-card rounded-3xl p-8">
                                <p className="text-zinc-300 font-sans text-lg leading-relaxed italic">
                                    "Every celebration deserves an introduction as beautiful as the moment itself.
                                    We craft digital invitations that make your guests feel the magic before the event begins."
                                </p>
                                <div className="flex items-center gap-3 mt-6">
                                    <img
                                        src="/logo.png"
                                        alt="Uthsav"
                                        className="h-8 w-auto object-contain opacity-80"
                                    />
                                    <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-sans">
                                        Uthsav Team
                                    </span>
                                </div>
                            </div>

                            {/* Quick stats */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { value: "500+", label: "Events" },
                                    { value: "99%", label: "Satisfaction" },
                                    { value: "48hr", label: "Delivery" },
                                ].map((stat, i) => (
                                    <div key={i} className="glass-card rounded-2xl p-5 text-center">
                                        <div className="text-2xl font-serif font-bold text-white">{stat.value}</div>
                                        <div className="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-1">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-zinc-600 text-sm font-sans flex items-center gap-2">
                                <span className="text-[#D4AF37]">↓</span>
                                Scroll slowly to reveal each story
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
                                            <span className="text-xs font-medium bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-3 py-1 rounded-full font-sans tracking-wide">
                                                {testimonial.emoji} {testimonial.occasion}
                                            </span>
                                        </div>

                                        {/* Quote */}
                                        <div className="flex-1 flex items-center">
                                            <blockquote className="text-zinc-300 text-base font-sans leading-relaxed text-center italic">
                                                "{testimonial.description}"
                                            </blockquote>
                                        </div>

                                        {/* Avatar row */}
                                        <div className="w-full flex items-center gap-4 pt-4 border-t border-white/10">
                                            <Avatar className="!size-12 border border-[#D4AF37]/20 ring-1 ring-[#D4AF37]/10">
                                                <AvatarImage
                                                    src={testimonial.avatarUrl}
                                                    alt={`Portrait of ${testimonial.name}`}
                                                />
                                                <AvatarFallback className="bg-zinc-800 text-[#D4AF37] font-serif">
                                                    {testimonial.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <span className="block text-white font-serif text-lg font-semibold leading-tight">
                                                    {testimonial.name}
                                                </span>
                                                <span className="block text-zinc-500 text-xs font-sans mt-0.5 uppercase tracking-wider">
                                                    Uthsav Client
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

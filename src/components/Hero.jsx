import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const GoldenParticlesCanvas = React.lazy(() => import('./ui/GoldenParticlesCanvas'));

const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
};

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <section className="relative w-full min-h-screen overflow-hidden" id="home">
            {/* Premium Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F8D7E8] via-[#D9C2F0] to-[#FFF8F2]" />
                
                {/* Subtle overlay pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(248, 215, 232, 0.5) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(217, 194, 240, 0.5) 0%, transparent 50%)'
                }} />

                {/* Soft glowing particles - Lazy Loaded inside Suspense */}
                <Suspense fallback={<div className="absolute inset-0 bg-transparent" />}>
                    <div className="w-full h-full">
                        <GoldenParticlesCanvas />
                    </div>
                </Suspense>

                {/* Decorative corner elements */}
                <div className="absolute top-10 left-10 w-32 h-32 opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]" aria-hidden="true">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M30 50 Q50 30 70 50 Q50 70 30 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="50" cy="50" r="5" fill="currentColor" />
                    </svg>
                </div>

                <div className="absolute bottom-20 right-10 w-40 h-40 opacity-8 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]" aria-hidden="true">
                        <path d="M50 10 L61 39 L91 39 L67 57 L78 86 L50 68 L22 86 L33 57 L9 39 L39 39 Z" fill="currentColor" opacity="0.5" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-6 py-20">
                <motion.div 
                    className="max-w-4xl w-full text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Premium Badge */}
                    <motion.div 
                        variants={itemVariants}
                        className="inline-block mb-8"
                    >
                        <div className="border border-[#D4AF37]/40 rounded-full px-8 py-2 backdrop-blur-sm bg-white/20">
                            <span className="text-[#B68A2E] text-sm font-medium tracking-widest">✨ LUXURY INVITATIONS STUDIO ✨</span>
                        </div>
                    </motion.div>

                    {/* Main Headline with Staggered Word Reveal */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-serif font-bold text-[#4A2E2A] mb-6 leading-tight flex flex-col items-center"
                    >
                        <span className="flex flex-wrap justify-center gap-x-3 mb-2">
                            {"Crafting Elegant".split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                                    }}
                                    className="inline-block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B68A2E] flex flex-wrap justify-center gap-x-3">
                            {"Digital Invitations".split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                                    }}
                                    className="inline-block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </span>
                    </motion.h1>

                    {/* Decorative Line */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex justify-center mb-8"
                    >
                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full" />
                    </motion.div>

                    {/* Subheading */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
                    >
                        Experience the luxury of custom digital invitations designed with grace. From elegant wedding invites and save-the-date pages to personalized event websites—celebrate your special moments in style.
                    </motion.p>

                    {/* CTA Buttons with Spring Micro-interactions */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
                    >
                        <motion.button 
                            onClick={() => scrollToSection('categories')} 
                            className="btn-gold-primary cursor-pointer"
                            aria-label="View Our Gallery"
                            whileHover={{ scale: 1.04, y: -2, boxShadow: "0 15px 35px rgba(212, 175, 55, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                            View Our Gallery
                        </motion.button>
                        <motion.button 
                            onClick={() => scrollToSection('contact')} 
                            className="btn-gold-secondary cursor-pointer"
                            aria-label="Book Your Invitation"
                            whileHover={{ scale: 1.04, y: -2, backgroundColor: "rgba(212, 175, 55, 0.08)" }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                            Book Your Invitation
                        </motion.button>
                    </motion.div>

                    {/* Trust Badge */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-2xl" role="img" aria-label="diamond">💎</span>
                            <span className="font-medium">Premium Designs</span>
                        </div>
                        <div className="w-1 h-1 bg-[#D4AF37]/30 rounded-full hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="text-2xl" role="img" aria-label="sparkles">⚡</span>
                            <span className="font-medium">24-Hour Delivery</span>
                        </div>
                        <div className="w-1 h-1 bg-[#D4AF37]/30 rounded-full hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="text-2xl" role="img" aria-label="check">✓</span>
                            <span className="font-medium">Fully Customizable</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="flex flex-col items-center">
                    <span className="text-[#D4AF37]/60 text-sm mb-2 font-light">Scroll to explore</span>
                    <ChevronDown size={20} className="text-[#D4AF37]/60" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;

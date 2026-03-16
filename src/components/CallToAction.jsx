import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Particles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => {
                const size = Math.random() * 6 + 2;
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const duration = Math.random() * 10 + 5;
                const delay = Math.random() * 5;

                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-[#D4AF37]/50 blur-[2px]"
                        style={{
                            width: size,
                            height: size,
                            left: `${x}%`,
                            top: `${y}%`,
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0.5],
                        }}
                        transition={{
                            duration,
                            repeat: Infinity,
                            delay,
                            ease: "easeInOut",
                        }}
                    />
                );
            })}
        </div>
    );
};

const CallToAction = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative py-32 bg-gradient-to-br from-[#FFF8F2] via-[#F8D7E8]/20 to-[#D9C2F0]/10 text-gray-900 overflow-hidden border-t border-[#D4AF37]/30" ref={ref}>
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full mix-blend-screen filter blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/15 rounded-full mix-blend-screen filter blur-[100px] opacity-15 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <Particles />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-4xl mx-auto text-center border border-[#D4AF37]/40 bg-white/40 backdrop-blur-xl p-10 md:p-20 rounded-3xl shadow-lg relative overflow-hidden group hover:border-[#D4AF37]/60 hover:bg-white/50 transition-all duration-500">

                    <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <motion.div
                    className="flex justify-center mb-8 relative"
                    whileHover="hover"
                >
                    <img src="/logo.png" alt="Uthsav" className="h-10 w-auto object-contain mx-auto mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                        className="text-[#D4AF37] font-sans tracking-[0.2em] font-medium uppercase text-sm mb-6 block"
                    >
                        Celebrate Life’s Sacred Moments
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif leading-tight mb-8 text-[#4A2E2A]"
                    >
                        Make Your Celebration Special With <span className="text-[#D4AF37] italic">Beautiful Invitations</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-700 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-12"
                    >
                        Order a custom invitation design today and let us help you create a lasting first impression for your guests.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="group relative px-10 py-5 bg-[#D4AF37] text-zinc-950 rounded-full font-semibold text-lg overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300 border border-transparent"
                    >
                        <span className="relative z-10 font-sans tracking-wide">Get Your Invitation</span>
                        <div className="absolute inset-0 h-full w-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform scale-150 rounded-full" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#F3E5AB] opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 rounded-full" />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;

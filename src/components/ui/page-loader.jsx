import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = ({ onComplete }) => {
    const [phase, setPhase] = useState('logo'); // 'logo' | 'exit'

    useEffect(() => {
        // Show logo for 1.8s then exit
        const t1 = setTimeout(() => setPhase('exit'), 1800);
        // Notify parent after animation fully done
        const t2 = setTimeout(() => onComplete?.(), 2600);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-zinc-950 overflow-hidden"
                    initial={{ opacity: 1 }}
                    animate={phase === 'exit' ? { clipPath: 'inset(0 0 100% 0)' } : { opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    onAnimationComplete={() => { if (phase === 'exit') setPhase('done'); }}
                >
                    {/* Radial glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_transparent_70%)]" />

                    {/* Floating particles */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-[#D4AF37]/40"
                            style={{
                                width: Math.random() * 6 + 2,
                                height: Math.random() * 6 + 2,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{ y: [0, -60, 0], opacity: [0, 1, 0] }}
                            transition={{
                                duration: Math.random() * 2 + 1.5,
                                repeat: Infinity,
                                delay: Math.random() * 1.5,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}

                    {/* Logo block */}
                    <div className="flex flex-col items-center gap-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                            className="flex flex-col items-center"
                        >
                            <img
                                src="/logo.png"
                                alt="Uthsav Invitations"
                                className="h-24 md:h-32 w-auto object-contain drop-shadow-[0_0_24px_rgba(212,175,55,0.4)]"
                            />
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="text-white/40 text-sm uppercase tracking-[0.3em] font-sans"
                        >
                            Celebrate Life's Sacred Moments
                        </motion.p>

                        {/* Gold line loader bar */}
                        <motion.div
                            className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-4"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageLoader;

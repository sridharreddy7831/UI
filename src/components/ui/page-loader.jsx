import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = ({ onComplete }) => {
    const [phase, setPhase] = useState('logo'); // 'logo' | 'exit' | 'done'

    useEffect(() => {
        // Show logo for 1.8s then exit
        const t1 = setTimeout(() => setPhase('exit'), 1800);
        // Notify parent after animation fully done
        const t2 = setTimeout(() => onComplete?.(), 2600);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
                >
                    {/* SVG mask approach for expanding hole (high performance) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        <defs>
                            <mask id="hole-mask">
                                <rect width="100%" height="100%" fill="white" />
                                <motion.circle 
                                    cx="50%" cy="50%" 
                                    fill="black"
                                    initial={{ r: 0 }}
                                    animate={phase === 'exit' ? { r: '150vw' } : { r: 0 }}
                                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                    onAnimationComplete={() => { if (phase === 'exit') setPhase('done'); }}
                                />
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" fill="#09090b" mask="url(#hole-mask)" />
                    </svg>

                    {/* Radial glow */}
                    <motion.div 
                        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_transparent_70%)] z-0"
                        animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    />

                    {/* Floating particles */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-[#D4AF37]/40 z-0"
                            style={{
                                width: Math.random() * 6 + 2,
                                height: Math.random() * 6 + 2,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={phase === 'exit' ? { opacity: 0 } : { y: [0, -60, 0], opacity: [0, 1, 0] }}
                            transition={{
                                duration: phase === 'exit' ? 0.3 : Math.random() * 2 + 1.5,
                                repeat: phase === 'exit' ? 0 : Infinity,
                                delay: phase === 'exit' ? 0 : Math.random() * 1.5,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}

                    {/* Logo block */}
                    <motion.div 
                        className="flex flex-col items-center gap-4 relative z-10"
                        animate={phase === 'exit' ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeIn' }}
                    >
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
                            className="text-white/40 text-sm uppercase tracking-[0.3em] font-sans text-center px-4"
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
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageLoader;

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Soft Glowing Particles Background - Now in Gold
const GoldenParticles = () => {
    const count = 300;
    const positions = useMemo(() => {
        const coords = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            coords[i * 3] = (Math.random() - 0.5) * 20;
            coords[i * 3 + 1] = (Math.random() - 0.5) * 20;
            coords[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return coords;
    }, [count]);

    const pointsRef = useRef();

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
            pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial transparent color="#D4AF37" size={0.08} sizeAttenuation={true} depthWrite={false} fog={false} />
        </Points>
    );
};

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
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

                {/* Soft glowing particles */}
                <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                    <ambientLight intensity={0.6} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />
                    <pointLight position={[-10, -10, -10]} intensity={0.4} color="#D4AF37" />
                    <GoldenParticles />
                    <Environment preset="city" />
                </Canvas>

                {/* Decorative corner elements */}
                <div className="absolute top-10 left-10 w-32 h-32 opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M30 50 Q50 30 70 50 Q50 70 30 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="50" cy="50" r="5" fill="currentColor" />
                    </svg>
                </div>

                <div className="absolute bottom-20 right-10 w-40 h-40 opacity-8 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]">
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

                    {/* Main Headline */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-serif font-bold text-[#4A2E2A] mb-6 leading-tight"
                    >
                        Crafting Elegant<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B68A2E]">
                            Digital Wedding Invitations
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

                    {/* CTA Buttons */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
                    >
                        <button className="btn-gold-primary">
                            View Our Gallery
                        </button>
                        <button className="btn-gold-secondary">
                            Book Your Invitation
                        </button>
                    </motion.div>

                    {/* Trust Badge */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">💎</span>
                            <span className="font-medium">Premium Designs</span>
                        </div>
                        <div className="w-1 h-1 bg-[#D4AF37]/30 rounded-full hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">⚡</span>
                            <span className="font-medium">24-Hour Delivery</span>
                        </div>
                        <div className="w-1 h-1 bg-[#D4AF37]/30 rounded-full hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">✓</span>
                            <span className="font-medium">Fully Customizable</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex flex-col items-center">
                    <span className="text-[#D4AF37]/60 text-sm mb-2">Scroll to explore</span>
                    <ChevronDown size={20} className="text-[#D4AF37]/60" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;

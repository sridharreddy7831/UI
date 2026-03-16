import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import GlassmorphismTrustHero from './ui/glassmorphism-trust-hero';

// Soft Glowing Particles Background
const GlowingParticles = () => {
    const count = 500;
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
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial transparent color="#D4AF37" size={0.05} sizeAttenuation={true} depthWrite={false} fog={false} />
        </Points>
    );
};

// Floating Invitation Cards
const FloatingCard = ({ position, rotation, color }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.x = position[0] + (state.pointer.x * 2);
            meshRef.current.position.y = position[1] + (state.pointer.y * 2);
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>
            <mesh ref={meshRef} position={position} rotation={rotation} castShadow receiveShadow>
                <planeGeometry args={[2, 3]} />
                <meshPhysicalMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.5}
                    clearcoat={1}
                    transmission={0.5}
                    thickness={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </Float>
    );
};

const Hero = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-zinc-950" id="home">

            {/* 3D Background - moved behind the glassmorphism hero */}
            <div className="absolute inset-0 z-0">
                <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D4AF37" />

                    <GlowingParticles />

                    <FloatingCard position={[-5, 2, -3]} rotation={[0.2, 0.3, -0.4]} color="#18181b" />
                    <FloatingCard position={[6, -2, -4]} rotation={[-0.1, -0.4, 0.2]} color="#18181b" />

                    <Environment preset="city" />
                </Canvas>
            </div>

            {/* New Glassmorphism Hero */}
            <div className="relative z-10 w-full h-full">
                <GlassmorphismTrustHero />
            </div>

        </section>
    );
};

export default Hero;

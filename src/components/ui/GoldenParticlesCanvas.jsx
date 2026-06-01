import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';

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

export default function GoldenParticlesCanvas() {
    return (
        <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={0.6} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.4} color="#D4AF37" />
            <GoldenParticles />
        </Canvas>
    );
}

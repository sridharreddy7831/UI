/**
 * FloatingParticles.jsx — Ambient floating sparkle/light particles
 * Creates a dreamy, cinematic atmosphere in the background.
 */
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Soft gold/pink/lavender ambient particle colors
const PARTICLE_COLORS = [
  'rgba(212, 175, 55, 0.4)',   // gold
  'rgba(244, 208, 63, 0.3)',   // bright gold
  'rgba(248, 215, 232, 0.5)',  // blush pink
  'rgba(217, 194, 240, 0.4)',  // lavender
  'rgba(230, 183, 169, 0.3)',  // rose gold
  'rgba(255, 255, 255, 0.5)',  // white
];

/**
 * Ambient floating particles that drift upward with gentle oscillation.
 * @param {number} count - number of particles (default 20)
 * @param {boolean} reducedMotion - reduce count for mobile
 */
const FloatingParticles = ({ count = 20, reducedMotion = false }) => {
  const particleCount = reducedMotion ? Math.floor(count / 3) : count;

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,             // vw position
      size: 2 + Math.random() * 5,        // particle size
      duration: 8 + Math.random() * 12,   // float cycle duration
      delay: Math.random() * 6,           // start delay
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      driftX: (Math.random() - 0.5) * 60, // horizontal drift range
      opacity: 0.2 + Math.random() * 0.5,
    }));
  }, [particleCount]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 5 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '-5%',
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            x: [0, p.driftX, -p.driftX * 0.5, p.driftX * 0.3],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(FloatingParticles);

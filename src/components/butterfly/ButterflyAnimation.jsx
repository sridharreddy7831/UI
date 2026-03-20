/**
 * ButterflyAnimation.jsx — Premium butterfly animation system
 * 
 * Main orchestrating component that renders:
 * - 6–10 animated butterflies with organic flight paths
 * - Ambient floating sparkle particles
 * - Click-triggered sparkle bursts
 * - Mouse tracking for magnetic/parallax butterfly movement
 * - Responsive: reduced effects on mobile
 * - Fade-in on page load
 * 
 * Usage:
 *   import ButterflyAnimation from './components/butterfly/ButterflyAnimation';
 *   // Place anywhere — renders as a fixed overlay layer
 *   <ButterflyAnimation />
 * 
 * Props:
 *   @param {number} butterflyCount - Number of butterflies (default: 8, max: 10)
 *   @param {boolean} showParticles - Show ambient floating particles (default: true)
 *   @param {boolean} enabled - Enable/disable the entire animation system (default: true)
 */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import Butterfly from './Butterfly';
import SparklesBurst from './SparklesBurst';
import FloatingParticles from './FloatingParticles';

/**
 * Detect if device prefers reduced motion or is a small screen
 */
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Check CSS prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth < 768;
    setReduced(mediaQuery.matches || isMobile);

    const handler = (e) => setReduced(e.matches || window.innerWidth < 768);
    mediaQuery.addEventListener('change', handler);

    // Also watch for resize
    const resizeHandler = () => {
      setReduced(mediaQuery.matches || window.innerWidth < 768);
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return reduced;
};

const ButterflyAnimation = ({
  butterflyCount = 8,
  showParticles = true,
  enabled = true,
}) => {
  const reducedMotion = useReducedMotion();
  const [sparkles, setSparkles] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position tracking for magnetic/parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Clamp butterfly count
  const count = Math.min(10, Math.max(1, butterflyCount));
  // Reduce count on mobile
  const effectiveCount = reducedMotion ? Math.min(4, count) : count;

  // Generate butterfly configurations
  const butterflies = useMemo(() => {
    return Array.from({ length: effectiveCount }, (_, i) => {
      // Pick a random edge to fly in from: 0=top, 1=right, 2=bottom, 3=left
      const edge = Math.floor(Math.random() * 4);
      let ix, iy;
      if (edge === 0) { ix = Math.random() * 100; iy = -25; }
      else if (edge === 1) { ix = 125; iy = Math.random() * 100; }
      else if (edge === 2) { ix = Math.random() * 100; iy = 125; }
      else { ix = -25; iy = Math.random() * 100; }

      return {
        id: i,
        initialX: ix,
        initialY: iy,
        size: reducedMotion ? 30 + Math.random() * 15 : 35 + Math.random() * 25,
        colorVariant: i % 5,
      };
    });
  }, [effectiveCount, reducedMotion]);

  // Track mouse position
  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled, mouseX, mouseY]);

  // Fade-in on mount
  useEffect(() => {
    if (enabled) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [enabled]);

  // Handle butterfly click — spawn sparkle burst
  const handleButterflyClick = useCallback((x, y) => {
    const newBurst = { id: Date.now() + Math.random(), x, y };
    setSparkles((prev) => [...prev, newBurst]);

    // Remove burst after animation completes
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newBurst.id));
    }, 1200);
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 50 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      aria-hidden="true"
    >
      {/* === Ambient floating particles === */}
      {showParticles && (
        <FloatingParticles
          count={reducedMotion ? 8 : 20}
          reducedMotion={reducedMotion}
        />
      )}

      {/* === Butterflies === */}
      {butterflies.map((b) => (
        <Butterfly
          key={b.id}
          id={b.id}
          initialX={b.initialX}
          initialY={b.initialY}
          size={b.size}
          colorVariant={b.colorVariant}
          mouseX={mouseX}
          mouseY={mouseY}
          onButterflyClick={handleButterflyClick}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* === Sparkle bursts (click effects) === */}
      <AnimatePresence>
        {sparkles.map((burst) => (
          <SparklesBurst
            key={burst.id}
            x={burst.x}
            y={burst.y}
            count={reducedMotion ? 6 : 14}
            radius={reducedMotion ? 50 : 90}
          />
        ))}
      </AnimatePresence>

      {/* === Subtle gold shimmer overlay for cinematic feel === */}
      {!reducedMotion && (
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.03) 0%, transparent 70%)',
            zIndex: 1,
          }}
        />
      )}
    </motion.div>
  );
};

export default React.memo(ButterflyAnimation);

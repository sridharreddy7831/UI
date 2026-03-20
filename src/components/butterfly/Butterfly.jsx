/**
 * Butterfly.jsx — Individual butterfly sub-component
 * 
 * Features:
 * - Organic curved flight paths using cubic bezier keyframes
 * - Wing fluttering via CSS rotation oscillation
 * - Subtle hover/pause behavior between flight segments
 * - Mouse proximity magnetic/parallax reaction
 * - Hover glow + scale effect
 * - Click triggers sparkle burst (via parent callback)
 * - Responsive: reduced motion on mobile
 */
import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- SVG Butterfly (elegant gold/pink/lavender inline SVG) ---
const ButterflySVG = ({ colorVariant = 0 }) => {
  // Multiple color schemes matching the wedding palette
  // Deep, highly-visible jewel tones that pop against the light backgrounds
  const palettes = [
    // Deep Gold & Vibrant Pink
    { wing1: '#B8860B', wing2: '#D81B60', body: '#4A2E2A', accent: '#FFD700' },
    // Royal Purple & Rose Gold
    { wing1: '#5E1B89', wing2: '#E6B7A9', body: '#3E0F5E', accent: '#FFB6C1' },
    // Rich Burgundy & Champagne
    { wing1: '#880E4F', wing2: '#D4AF37', body: '#4A0829', accent: '#F4B6C2' },
    // Deep Plum & Radiant Magenta
    { wing1: '#4A148C', wing2: '#C2185B', body: '#26094A', accent: '#D9C2F0' },
    // Dark Rose & Deep Bronze
    { wing1: '#AD1457', wing2: '#A67C00', body: '#5E092D', accent: '#F8D7E8' },
  ];
  const c = palettes[colorVariant % palettes.length];

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))' }}
    >
      <defs>
        <radialGradient id={`wg1-${colorVariant}`} cx="30%" cy="40%" r="70%">
          <stop offset="0%" stopColor={c.wing1} stopOpacity="0.9" />
          <stop offset="60%" stopColor={c.wing2} stopOpacity="0.6" />
          <stop offset="100%" stopColor={c.accent} stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id={`wg2-${colorVariant}`} cx="70%" cy="40%" r="70%">
          <stop offset="0%" stopColor={c.wing2} stopOpacity="0.9" />
          <stop offset="60%" stopColor={c.wing1} stopOpacity="0.6" />
          <stop offset="100%" stopColor={c.accent} stopOpacity="0.3" />
        </radialGradient>
        <linearGradient id={`body-${colorVariant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.body} />
          <stop offset="100%" stopColor="#4A2E2A" />
        </linearGradient>
        {/* Glow filter */}
        <filter id={`glow-${colorVariant}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Left upper wing */}
      <path
        d="M50 45 C30 15, 5 20, 15 45 C5 55, 20 70, 50 55"
        fill={`url(#wg1-${colorVariant})`}
        filter={`url(#glow-${colorVariant})`}
      />
      {/* Left lower wing */}
      <path
        d="M50 55 C30 60, 15 80, 30 85 C40 88, 50 75, 50 60"
        fill={`url(#wg1-${colorVariant})`}
        opacity="0.8"
      />
      {/* Right upper wing */}
      <path
        d="M50 45 C70 15, 95 20, 85 45 C95 55, 80 70, 50 55"
        fill={`url(#wg2-${colorVariant})`}
        filter={`url(#glow-${colorVariant})`}
      />
      {/* Right lower wing */}
      <path
        d="M50 55 C70 60, 85 80, 70 85 C60 88, 50 75, 50 60"
        fill={`url(#wg2-${colorVariant})`}
        opacity="0.8"
      />

      {/* Wing veins - delicate filigree lines */}
      <g stroke={c.accent} strokeWidth="0.4" fill="none" opacity="0.5">
        <path d="M50 48 C38 28, 18 30, 20 45" />
        <path d="M50 48 C35 35, 12 38, 18 50" />
        <path d="M50 48 C62 28, 82 30, 80 45" />
        <path d="M50 48 C65 35, 88 38, 82 50" />
        <path d="M50 56 C38 65, 25 78, 32 82" />
        <path d="M50 56 C62 65, 75 78, 68 82" />
      </g>

      {/* Wing edge sparkles */}
      <circle cx="20" cy="35" r="1.2" fill={c.accent} opacity="0.7" />
      <circle cx="80" cy="35" r="1.2" fill={c.accent} opacity="0.7" />
      <circle cx="15" cy="50" r="0.8" fill="#fff" opacity="0.6" />
      <circle cx="85" cy="50" r="0.8" fill="#fff" opacity="0.6" />
      <circle cx="30" cy="82" r="0.8" fill={c.wing1} opacity="0.5" />
      <circle cx="70" cy="82" r="0.8" fill={c.wing1} opacity="0.5" />

      {/* Body */}
      <ellipse cx="50" cy="55" rx="2.5" ry="15" fill={`url(#body-${colorVariant})`} />
      {/* Head */}
      <circle cx="50" cy="38" r="3" fill={c.body} />
      {/* Antennae */}
      <path d="M49 36 C45 28, 38 22, 35 20" stroke={c.body} strokeWidth="0.6" fill="none" />
      <path d="M51 36 C55 28, 62 22, 65 20" stroke={c.body} strokeWidth="0.6" fill="none" />
      <circle cx="35" cy="20" r="1" fill={c.accent} />
      <circle cx="65" cy="20" r="1" fill={c.accent} />
    </svg>
  );
};

/**
 * Generate an organic curved flight path with random waypoints.
 * Returns an array of { x, y } positions as percentages of viewport.
 */
const generateFlightPath = (startX, startY) => {
  const points = [{ x: startX, y: startY }];
  const steps = 4 + Math.floor(Math.random() * 3); // 4-6 waypoints
  let cx = startX;
  let cy = startY;

  for (let i = 0; i < steps; i++) {
    cx += (Math.random() - 0.5) * 40; // drift ±20vw
    cy += (Math.random() - 0.5) * 30; // drift ±15vh
    // Clamp within bounds with padding
    cx = Math.max(5, Math.min(95, cx));
    cy = Math.max(5, Math.min(90, cy));
    points.push({ x: cx, y: cy });
  }
  return points;
};

/**
 * Butterfly sub-component
 */
const Butterfly = ({
  id,
  initialX,
  initialY,
  size = 50,
  colorVariant = 0,
  mouseX,
  mouseY,
  onButterflyClick,
  reducedMotion = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDarting, setIsDarting] = useState(false);
  const [flightPath, setFlightPath] = useState(() => generateFlightPath(initialX, initialY));
  const butterflyRef = useRef(null);

  // --- Magnetic mouse reaction ---
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springX = useSpring(magneticX, { stiffness: 50, damping: 20 });
  const springY = useSpring(magneticY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (reducedMotion || !butterflyRef.current) return;

    const unsubX = mouseX.on('change', (mx) => {
      const rect = butterflyRef.current?.getBoundingClientRect();
      if (!rect) return;
      const bx = rect.left + rect.width / 2;
      const dist = mx - bx;
      // Magnetic pull: stronger when closer, max 15px
      const pull = Math.max(-15, Math.min(15, dist * 0.02));
      magneticX.set(pull);
    });

    const unsubY = mouseY.on('change', (my) => {
      const rect = butterflyRef.current?.getBoundingClientRect();
      if (!rect) return;
      const by = rect.top + rect.height / 2;
      const dist = my - by;
      const pull = Math.max(-15, Math.min(15, dist * 0.02));
      magneticY.set(pull);
    });

    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, magneticX, magneticY, reducedMotion]);

  // --- Flight animation keyframes ---
  const xKeyframes = useMemo(
    () => flightPath.map((p) => `${p.x}vw`),
    [flightPath]
  );
  const yKeyframes = useMemo(
    () => flightPath.map((p) => `${p.y}vh`),
    [flightPath]
  );

  // Total flight duration
  const flightDuration = isDarting ? 0.8 : (reducedMotion ? 30 : 18 + Math.random() * 14);

  // Generate new path on animation complete
  const handleFlightComplete = useCallback(() => {
    const lastPoint = flightPath[flightPath.length - 1];
    setFlightPath(generateFlightPath(lastPoint.x, lastPoint.y));
  }, [flightPath]);

  // Click handler
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (onButterflyClick) {
        onButterflyClick(e.clientX, e.clientY);
      }
      setIsDarting(true);
      const rect = butterflyRef.current?.getBoundingClientRect();
      const currentX = rect ? (rect.left / window.innerWidth) * 100 : initialX;
      const currentY = rect ? (rect.top / window.innerHeight) * 100 : initialY;
      
      // Dart away fast to a single new random point
      setFlightPath([
        { x: currentX, y: currentY }, 
        { x: 5 + Math.random() * 90, y: 5 + Math.random() * 80 }
      ]);
      
      setTimeout(() => setIsDarting(false), 800);
    },
    [onButterflyClick, initialX, initialY]
  );

  return (
    <motion.div
      ref={butterflyRef}
      className="absolute cursor-pointer pointer-events-auto"
      style={{
        width: size,
        height: size,
        x: springX,
        y: springY,
        zIndex: 10 + id,
      }}
      // --- Main flight animation ---
      animate={{
        left: xKeyframes,
        top: yKeyframes,
      }}
      transition={{
        duration: flightDuration,
        ease: isDarting ? 'easeOut' : 'easeInOut',
        repeat: 0,
        // Natural pace with slower segments, removed when darting quickly
        times: isDarting ? [0, 1] : xKeyframes.map((_, i) => {
          const base = i / (xKeyframes.length - 1);
          return Math.min(1, Math.max(0, base + (Math.random() - 0.5) * 0.05));
        }).sort((a, b) => a - b),
      }}
      onAnimationComplete={handleFlightComplete}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Wing flutter wrapper — oscillates rotation for flapping effect */}
      <motion.div
        style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: reducedMotion ? [0, 30, 0] : [0, 45, 0, -20, 0, 40, 0],
          rotateZ: reducedMotion ? [0, 5, -5, 0] : [-8, 5, -10, 8, -5, 10, -8],
          scale: isDarting ? 0.7 : isHovered ? 1.3 : [0.95, 1.05, 0.98, 1.02, 0.95],
        }}
        transition={{
          rotateY: {
            duration: reducedMotion ? 2 : (isDarting ? 0.08 : 0.8 + Math.random() * 0.4),
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotateZ: {
            duration: reducedMotion ? 6 : (isDarting ? 0.3 : 3 + Math.random() * 2),
            repeat: Infinity,
            ease: 'easeInOut',
          },
          scale: {
            duration: isHovered || isDarting ? 0.3 : 4 + Math.random() * 2,
            repeat: isHovered || isDarting ? 0 : Infinity,
            ease: isHovered || isDarting ? 'easeOut' : 'easeInOut',
          },
        }}
      >
        {/* Glow effect on hover/darting */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          animate={{
            opacity: isDarting ? 1 : isHovered ? 1 : 0.2,
            scale: isDarting ? 3 : isHovered ? 1.6 : 1,
            background: isDarting 
              ? 'radial-gradient(circle, rgba(216,27,96,0.6) 0%, transparent 80%)'
              : 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Butterfly SVG */}
        <ButterflySVG colorVariant={colorVariant} />
      </motion.div>
    </motion.div>
  );
};

export default React.memo(Butterfly);

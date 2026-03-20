/**
 * Sparkle.jsx — Individual sparkle/confetti particle effect
 * Used for click bursts and ambient floating sparkles.
 */
import React from 'react';
import { motion } from 'framer-motion';

// Gold/pink/lavender palette sparkle colors
const SPARKLE_COLORS = [
  '#D4AF37', // champagne gold
  '#F4D03F', // bright gold
  '#F8D7E8', // blush pink
  '#D9C2F0', // lavender
  '#E6B7A9', // rose gold
  '#FDE6DC', // soft peach
  '#FFFFFF', // white highlight
];

/**
 * A single sparkle particle that fades and scales out.
 * @param {number} x - starting X position
 * @param {number} y - starting Y position
 * @param {string} color - sparkle color (random if not set)
 * @param {number} size - sparkle size in px
 * @param {number} delay - animation delay
 * @param {number} duration - animation duration
 * @param {object} drift - { x, y } drift offset during animation
 */
const Sparkle = ({
  x = 0,
  y = 0,
  color,
  size = 6,
  delay = 0,
  duration = 0.8,
  drift = { x: 0, y: 0 },
}) => {
  const sparkleColor =
    color || SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        zIndex: 9999,
      }}
      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
      animate={{
        opacity: [1, 1, 0],
        scale: [0, 1.2, 0],
        x: drift.x,
        y: drift.y,
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {/* 4-point star SVG sparkle */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 0C10 0 12 8 10 10C8 12 0 10 0 10C0 10 8 8 10 10C12 12 10 20 10 20C10 20 8 12 10 10C12 8 20 10 20 10C20 10 12 12 10 10C8 8 10 0 10 0Z"
          fill={sparkleColor}
        />
      </svg>
      {/* Glow effect behind sparkle */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: sparkleColor,
          filter: `blur(${size * 0.6}px)`,
          opacity: 0.6,
        }}
      />
    </motion.div>
  );
};

export default React.memo(Sparkle);

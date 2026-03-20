/**
 * SparklesBurst.jsx — Renders a burst of sparkle particles
 * Triggered on butterfly click events.
 */
import React, { useMemo } from 'react';
import Sparkle from './Sparkle';

/**
 * Burst of sparkles radiating outward from a center point.
 * @param {number} x - center X
 * @param {number} y - center Y
 * @param {number} count - number of sparkles
 * @param {number} radius - spread radius
 */
const SparklesBurst = ({ x, y, count = 12, radius = 80 }) => {
  const sparkles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const dist = radius * (0.4 + Math.random() * 0.6);
      return {
        id: i,
        size: 4 + Math.random() * 8,
        delay: Math.random() * 0.2,
        duration: 0.6 + Math.random() * 0.6,
        drift: {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
        },
      };
    });
  }, [count, radius]);

  return (
    <div className="pointer-events-none absolute" style={{ left: 0, top: 0, zIndex: 9999 }}>
      {sparkles.map((s) => (
        <Sparkle
          key={s.id}
          x={x}
          y={y}
          size={s.size}
          delay={s.delay}
          duration={s.duration}
          drift={s.drift}
        />
      ))}
    </div>
  );
};

export default React.memo(SparklesBurst);

"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "motion/react";
import { cn } from "../../lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  // Detect when the SVG scrolls into view — replay animation each time
  const isInView = useInView(svgRef, { margin: "-100px", once: false });
  const strokeControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      // Reset then play the stroke animation
      strokeControls.set({ strokeDashoffset: 1000, strokeDasharray: 1000 });
      strokeControls.start({
        strokeDashoffset: 0,
        strokeDasharray: 1000,
        transition: { duration: 4, ease: "easeInOut" },
      });
    } else {
      // Reset when out of view so it replays on next scroll
      strokeControls.set({ strokeDashoffset: 1000, strokeDasharray: 1000 });
    }
  }, [isInView, strokeControls]);

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="25%" stopColor="#f5d97f" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#f5d97f" />
              <stop offset="100%" stopColor="#D4AF37" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {/* Faint outline — only visible on hover */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        fill="transparent"
        stroke="rgba(212, 175, 55, 0.15)"
        fontSize="72"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="bold"
        style={{ opacity: hovered ? 0.7 : 0, transition: "opacity 0.3s" }}
      >
        {text}
      </text>

      {/* Animated stroke — replays every time footer scrolls into view */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        fill="transparent"
        stroke="#D4AF37"
        fontSize="72"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="bold"
        animate={strokeControls}
      >
        {text}
      </motion.text>

      {/* Cursor-following gold gradient reveal on hover */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        fill="transparent"
        fontSize="72"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="bold"
      >
        {text}
      </text>
    </svg>
  );
};


export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, transparent 50%, rgba(212, 175, 55, 0.08) 100%)",
      }}
    />
  );
};

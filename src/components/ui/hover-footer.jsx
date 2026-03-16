"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
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

  // Only trigger the draw animation when the SVG scrolls into view
  const isInView = useInView(svgRef, { once: true, margin: "-50px" });

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
      onTouchStart={(e) => {
        setHovered(true);
        const touch = e.touches[0];
        setCursor({ x: touch.clientX, y: touch.clientY });
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        setCursor({ x: touch.clientX, y: touch.clientY });
      }}
      onTouchEnd={() => setHovered(false)}
      className={cn("select-none uppercase cursor-pointer touch-none", className)}
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
              <stop offset="0%"   stopColor="#D4AF37" />
              <stop offset="25%"  stopColor="#f5d97f" />
              <stop offset="50%"  stopColor="#ffffff" />
              <stop offset="75%"  stopColor="#f5d97f" />
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
          <stop offset="0%"   stopColor="white" />
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

      {/* Faint outline trace — visible only on hover */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        fill="transparent"
        stroke="rgba(255,255,255,0.15)"
        fontSize="72"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="bold"
        style={{ opacity: hovered ? 0.7 : 0, transition: "opacity 0.3s" }}
      >
        {text}
      </text>

      {/* Animated stroke draw-on effect — triggers when scrolled into view */}
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
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={isInView ? {
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        } : {
          strokeDashoffset: 1000,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>

      {/* Cursor-following gold gradient reveal */}
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

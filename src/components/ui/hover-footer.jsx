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
  const [revealProgress, setRevealProgress] = useState(0);
  const [fontSize, setFontSize] = useState(72);

  // Trigger animation when SVG comes into view
  const isInView = useInView(svgRef, { margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      setRevealProgress(1);
    } else {
      setRevealProgress(0);
    }
  }, [isInView]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setFontSize(48);
      } else if (window.innerWidth < 768) {
        setFontSize(56);
      } else if (window.innerWidth < 1024) {
        setFontSize(64);
      } else {
        setFontSize(72);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

        {/* Reveal animation mask */}
        <motion.linearGradient
          id="revealFill"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          initial={{ x1: "-100%", x2: "0%" }}
          animate={
            revealProgress === 1
              ? { x1: "0%", x2: "100%" }
              : { x1: "-100%", x2: "0%" }
          }
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <stop offset="0%"   stopColor="#D4AF37" />
          <stop offset="50%"  stopColor="#F3E5AB" />
          <stop offset="100%" stopColor="#D4AF37" />
        </motion.linearGradient>
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
        fontSize={fontSize}
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="bold"
        style={{ opacity: hovered ? 0.7 : 0, transition: "opacity 0.3s" }}
      >
        {text}
      </text>

      {/* Write each letter one by one like handwriting */}
      {text.split('').map((letter, index) => (
        <motion.text
          key={`letter-outline-${index}`}
          x={`${50 + (index - text.length / 2) * 8}%`}
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          fill="transparent"
          stroke="#D4AF37"
          fontSize={fontSize}
          fontFamily="Helvetica, Arial, sans-serif"
          fontWeight="bold"
          initial={{ strokeDashoffset: 300, strokeDasharray: 300, opacity: 0 }}
          animate={
            revealProgress === 1
              ? {
                  strokeDashoffset: 0,
                  strokeDasharray: 300,
                  opacity: 1,
                }
              : {
                  strokeDashoffset: 300,
                  strokeDasharray: 300,
                  opacity: 0,
                }
          }
          transition={{
            duration: 0.4,
            delay: index * 0.12,
            ease: "easeInOut",
          }}
        >
          {letter}
        </motion.text>
      ))}

      {/* Fill letters one by one after outline */}
      {text.split('').map((letter, index) => (
        <motion.text
          key={`letter-fill-${index}`}
          x={`${50 + (index - text.length / 2) * 8}%`}
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          fill="url(#revealFill)"
          stroke="transparent"
          fontSize={fontSize}
          fontFamily="Helvetica, Arial, sans-serif"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={
            revealProgress === 1
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={{
            duration: 0.3,
            delay: text.length * 0.12 + 0.4 + index * 0.08,
            ease: "easeInOut",
          }}
        >
          {letter}
        </motion.text>
      ))}

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
        fontSize={fontSize}
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

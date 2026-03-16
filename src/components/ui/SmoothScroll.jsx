import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Single source of truth for smoothness
      wheelMultiplier: 1,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
      // Normalize wheel events
      normalizeWheel: true,
      syncTouch: true
    });

    // Synchronize Lenis with GSAP ScrollTrigger (CRITICAL for laptop trackpads)
    lenis.on('scroll', ScrollTrigger.update);

    // Let GSAP drive the render loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP sends seconds, Lenis expects milliseconds
    });

    // Disable GSAP's lag smoothing to prevent fighting with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

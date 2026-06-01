import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const { pathname } = useLocation();
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const l = new Lenis({
      lerp: 0.1, // Single source of truth for smoothness
      wheelMultiplier: 1,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
      // Normalize wheel events
      normalizeWheel: true,
      syncTouch: true
    });

    setLenis(l);

    // Synchronize Lenis with GSAP ScrollTrigger (CRITICAL for laptop trackpads)
    l.on('scroll', ScrollTrigger.update);

    // Let GSAP drive the render loop
    gsap.ticker.add((time) => {
      l.raf(time * 1000); // GSAP sends seconds, Lenis expects milliseconds
    });

    // Disable GSAP's lag smoothing to prevent fighting with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(l.raf);
      l.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return <>{children}</>;
}

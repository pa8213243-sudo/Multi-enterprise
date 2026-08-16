import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let rafId: number;
    let lenis: Lenis | null = null;

    try {
      // Initialize Lenis smooth scroll
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    } catch (err) {
      console.warn('Smooth scroll fallback:', err);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        try {
          lenis.destroy();
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  return <div className="smooth-scroll-wrapper">{children}</div>;
};

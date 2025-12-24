'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollConfig } from '@/config/scroll';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Skip smooth scroll if user prefers reduced motion
            return;
        }

        // Initialize Lenis
        const lenis = new Lenis({
            duration: scrollConfig.lenis.duration,
            easing: scrollConfig.lenis.easing,
        });

        lenisRef.current = lenis;

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Define ticker function for adding/removing
        const updateLenis = (time: number) => {
            lenis.raf(time * 1000);
        };

        // Add Lenis to GSAP ticker (avoid duplicate ticker)
        gsap.ticker.add(updateLenis);

        // Disable GSAP's default lag smoothing to prevent conflicts
        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            gsap.ticker.remove(updateLenis);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}

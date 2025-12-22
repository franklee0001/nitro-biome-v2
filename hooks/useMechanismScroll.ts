'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollConfig } from '@/config/scroll';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface UseMechanismScrollOptions {
    enabled?: boolean;
    sceneCount?: number;
    onSceneChange?: (sceneIndex: number) => void;
}

export function useMechanismScroll(options: UseMechanismScrollOptions = {}) {
    const { enabled = true, sceneCount = 5, onSceneChange } = options;

    const containerRef = useRef<HTMLDivElement>(null);
    const lottieRef = useRef<any>(null); // Lottie instance
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const currentSceneRef = useRef<number>(0);

    useEffect(() => {
        if (!enabled || !containerRef.current) return;

        const container = containerRef.current;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Show final scene or first scene for reduced motion
            onSceneChange?.(0);
            return;
        }

        // Create ScrollTrigger to pin section and scrub through scenes
        scrollTriggerRef.current = ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: `+=${scrollConfig.scrollTrigger.mechanismPinDuration * 100}%`,
            pin: true,
            scrub: scrollConfig.scrollTrigger.scrub,
            onUpdate: (self) => {
                const progress = self.progress; // 0 to 1

                // Map progress to scene index
                const sceneIndex = Math.min(
                    Math.floor(progress * sceneCount),
                    sceneCount - 1
                );

                // Update scene if changed
                if (sceneIndex !== currentSceneRef.current) {
                    currentSceneRef.current = sceneIndex;
                    onSceneChange?.(sceneIndex);
                }

                // If Lottie is available, scrub to frame
                if (lottieRef.current) {
                    const totalFrames = lottieRef.current.totalFrames;
                    const targetFrame = progress * totalFrames;
                    lottieRef.current.goToAndStop(targetFrame, true);
                }
            },
        });

        // Cleanup
        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
        };
    }, [enabled, sceneCount, onSceneChange]);

    return { containerRef, lottieRef };
}

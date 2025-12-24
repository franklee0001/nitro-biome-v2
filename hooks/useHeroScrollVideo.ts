'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollConfig } from '@/config/scroll';

// Register plugin once
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface UseHeroScrollVideoOptions {
    enabled?: boolean;
}

interface UseHeroScrollVideoRefs {
    wrapperRef: React.RefObject<HTMLElement | null>;
    pinRef: React.RefObject<HTMLDivElement | null>;
    videoRef: React.RefObject<HTMLVideoElement | null>;
}

export function useHeroScrollVideo({ enabled = true }: UseHeroScrollVideoOptions = {}): UseHeroScrollVideoRefs {
    const wrapperRef = useRef<HTMLElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Refs for RAF-based damping
    const targetTimeRef = useRef(0);
    const currentTimeRef = useRef(0);
    const rafIdRef = useRef<number | null>(null);
    const triggerRef = useRef<ScrollTrigger | null>(null);
    const videoDurationRef = useRef(0);

    useLayoutEffect(() => {
        if (!enabled) {
            return;
        }

        const wrapper = wrapperRef.current;
        const pinEl = pinRef.current;
        const video = videoRef.current;

        if (!wrapper || !pinEl || !video) {
            console.warn('[HeroScrollVideo] Missing refs');
            return;
        }

        // Check reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const { heroDampingLerp, heroScrub, heroBaseScrollDistanceVh, heroScrollPerSecondVh } = scrollConfig.scrollTrigger;

        // RAF-based damping loop
        const updateVideoTime = () => {
            const video = videoRef.current;
            if (!video || video.seeking) {
                // Skip update while seeking to avoid jumpy behavior
                rafIdRef.current = requestAnimationFrame(updateVideoTime);
                return;
            }

            const target = targetTimeRef.current;
            const current = currentTimeRef.current;

            // Lerp towards target
            const diff = target - current;
            if (Math.abs(diff) > 0.001) {
                const newTime = current + diff * heroDampingLerp;
                const clampedTime = Math.max(0, Math.min(newTime, videoDurationRef.current - 0.01));

                currentTimeRef.current = clampedTime;
                video.currentTime = clampedTime;
            }

            rafIdRef.current = requestAnimationFrame(updateVideoTime);
        };

        const init = () => {
            const duration = video.duration;
            if (!duration || isNaN(duration) || duration <= 0) {
                console.warn('[HeroScrollVideo] No duration yet');
                return;
            }

            videoDurationRef.current = duration;

            // Pause and reset
            video.pause();
            video.currentTime = 0;
            currentTimeRef.current = 0;
            targetTimeRef.current = 0;

            // Calculate dynamic scroll distance
            const dynamicVh = heroBaseScrollDistanceVh + (duration * heroScrollPerSecondVh);
            const scrollDistancePx = Math.round(window.innerHeight * dynamicVh / 100);

            // Set wrapper height dynamically
            wrapper.style.height = `${dynamicVh}vh`;

            // Create ScrollTrigger
            triggerRef.current = ScrollTrigger.create({
                trigger: wrapper,
                start: 'top top',
                end: () => `+=${scrollDistancePx}`,
                scrub: heroScrub,
                pin: pinEl,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Update target time (damping happens in RAF loop)
                    const newTarget = self.progress * duration;
                    targetTimeRef.current = Math.max(0, Math.min(newTarget, duration - 0.01));
                },
            });

            // Start RAF loop
            rafIdRef.current = requestAnimationFrame(updateVideoTime);

            // Refresh ScrollTrigger
            ScrollTrigger.refresh();
        };

        // Handle resize
        const onResize = () => {
            if (triggerRef.current) {
                ScrollTrigger.refresh();
            }
        };

        // Wait for metadata
        if (video.readyState >= 1 && video.duration > 0) {
            init();
        } else {
            video.addEventListener('loadedmetadata', init, { once: true });
        }

        window.addEventListener('resize', onResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', onResize);
            video.removeEventListener('loadedmetadata', init);

            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }

            if (triggerRef.current) {
                triggerRef.current.kill();
                triggerRef.current = null;
            }

            // Reset refs
            targetTimeRef.current = 0;
            currentTimeRef.current = 0;
            videoDurationRef.current = 0;
        };
    }, [enabled]);

    return { wrapperRef, videoRef, pinRef };
}

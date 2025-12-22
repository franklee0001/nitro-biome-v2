'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollConfig } from '@/config/scroll';

// Register plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollVideoOptions {
    enabled?: boolean;
}

export function useScrollVideo(options: UseScrollVideoOptions = {}) {
    const { enabled = true } = options;
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    useEffect(() => {
        if (!enabled || !videoRef.current || !containerRef.current) return;

        const video = videoRef.current;
        const container = containerRef.current;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Just play the video normally if reduced motion is preferred
            video.play().catch(() => {
                // Ignore autoplay errors
            });
            return;
        }

        // Wait for video metadata to load
        const onLoadedMetadata = () => {
            const duration = video.duration;

            // Create ScrollTrigger to map scroll position to video time
            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: container,
                start: 'top top',
                end: `+=${scrollConfig.scrollTrigger.heroScrollRange * 100}%`,
                scrub: scrollConfig.scrollTrigger.scrub,
                onUpdate: (self) => {
                    // Map progress (0-1) to video currentTime
                    const targetTime = self.progress * duration;
                    video.currentTime = targetTime;
                },
            });
        };

        if (video.readyState >= 1) {
            // Metadata already loaded
            onLoadedMetadata();
        } else {
            video.addEventListener('loadedmetadata', onLoadedMetadata);
        }

        // Cleanup
        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
        };
    }, [enabled]);

    return { videoRef, containerRef };
}

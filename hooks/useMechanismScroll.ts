'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mechanismScenes } from '@/data/mechanism-scenes';

// Register plugin only on client
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function useMechanismScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSceneIndex, setActiveSceneIndex] = useState(0);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Context for easy cleanup
        const ctx = gsap.context(() => {
            // Pin the container for (scenes.length) * 100vh
            ScrollTrigger.create({
                trigger: container,
                start: 'top top',
                end: `+=${mechanismScenes.length * 100}%`,
                pin: true,
                scrub: 0.5,
                snap: {
                    snapTo: 1 / (mechanismScenes.length - 1),
                    duration: 0.5,
                    ease: 'power1.inOut'
                },
                onUpdate: (self) => {
                    // Calculate active index based on progress
                    // progress goes from 0 to 1
                    // We want:
                    // 0.0 - 0.2 -> Index 0
                    // 0.2 - 0.4 -> Index 1
                    // ...
                    // Let's rely on progress mapping

                    // Simple stepped mapping
                    const index = Math.min(
                        Math.round(self.progress * (mechanismScenes.length - 1)),
                        mechanismScenes.length - 1
                    );

                    setActiveSceneIndex(index);
                }
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return { containerRef, activeSceneIndex };
}

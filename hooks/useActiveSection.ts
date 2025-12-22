'use client';

import { useEffect, useState } from 'react';
import { SectionId } from '@/config/navigation';

export function useActiveSection(sectionIds: SectionId[]) {
    const [activeSection, setActiveSection] = useState<SectionId | null>(null);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (!element) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(id);
                        }
                    });
                },
                {
                    rootMargin: '-50% 0px -50% 0px', // Trigger when section is in center of viewport
                    threshold: 0,
                }
            );

            observer.observe(element);
            observers.push(observer);
        });

        // Cleanup
        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [sectionIds]);

    return activeSection;
}

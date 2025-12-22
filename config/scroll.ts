// Scroll animation configuration
export const scrollConfig = {
    // Lenis smooth scroll settings
    lenis: {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    },

    // GSAP ScrollTrigger settings
    scrollTrigger: {
        // Hero video scroll range (viewport units)
        heroScrollRange: 1.5,

        // Mechanism pin duration (viewport units)
        mechanismPinDuration: 5,

        // Smooth scrub value
        scrub: true,
    },

    // Animation durations (seconds)
    durations: {
        fast: 0.3,
        normal: 0.6,
        slow: 1.2,
    },

    // Easing presets
    easings: {
        smooth: 'power2.out',
        snappy: 'power3.inOut',
        gentle: 'power1.inOut',
    },
} as const;

// Scroll animation configuration
export const scrollConfig = {
    // Lenis smooth scroll settings
    lenis: {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    },

    // GSAP ScrollTrigger settings
    scrollTrigger: {
        // Hero video base scroll distance (viewport height units)
        heroBaseScrollDistanceVh: 300,

        // Additional vh per second of video duration (dynamic scroll)
        heroScrollPerSecondVh: 25,

        // Hero scrub damping for ScrollTrigger (1.0–2.2, higher = more lag)
        heroScrub: 1.8,

        // RAF-based damping lerp factor (0.0–1.0, lower = smoother but laggier)
        heroDampingLerp: 0.08,

        // Hero video scroll range (deprecated, use heroBaseScrollDistanceVh)
        heroScrollRange: 1.5,

        // Legacy static value (deprecated)
        heroScrollDistanceVh: 420,

        // Mechanism pin duration (viewport units)
        mechanismPinDuration: 5,

        // Smooth scrub value (general)
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

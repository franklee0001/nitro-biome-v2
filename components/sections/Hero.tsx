'use client';

import { Messages } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';
import { useHeroScrollVideo } from '@/hooks/useHeroScrollVideo';
import { useEffect, useState } from 'react';

interface HeroProps {
    messages: Messages;
}

export function Hero({ messages }: HeroProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
        const checkDesktop = () => setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
        const checkMotion = () => setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        checkDesktop();
        checkMotion();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    const scrollScrubEnabled = isMounted && isDesktop && !reducedMotion;
    const { wrapperRef, pinRef, videoRef } = useHeroScrollVideo({ enabled: scrollScrubEnabled });

    const handleCTAClick = () => {
        document.getElementById('mechanism')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Mobile/reduced motion: autoplay loop. Desktop scroll-scrub: no autoplay.
    const videoAutoPlay = !scrollScrubEnabled;
    const videoLoop = !scrollScrubEnabled;

    // Height is managed dynamically by the hook based on video duration
    // Initial height prevents layout shift before metadata loads
    const wrapperHeight = scrollScrubEnabled ? '100vh' : '100vh';

    return (
        <section
            id="hero"
            ref={wrapperRef}
            className="relative w-full bg-[var(--color-bg-primary)]"
            style={{ minHeight: wrapperHeight }}
        >
            {/* Pinned viewport layer - pinned by ScrollTrigger, not CSS sticky */}
            <div
                ref={pinRef}
                className="relative top-0 h-screen w-full overflow-hidden"
            >
                {/* Video Background */}
                <video
                    ref={videoRef}
                    src="/hero/hero.mp4"
                    autoPlay={videoAutoPlay}
                    loop={videoLoop}
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-primary)]/80 via-[var(--color-bg-primary)]/30 to-transparent" />

                {/* Content - Top Left */}
                <div className="relative z-10 pt-32 lg:pt-40 px-8 lg:px-16">
                    <div className="max-w-xl">
                        <h1 className="text-display-lg text-[var(--color-text-primary)] mb-6">
                            {messages.hero.headline}
                        </h1>
                        <p className="text-body-lg text-[var(--color-text-secondary)] mb-10 opacity-90">
                            {messages.hero.subheadline}
                        </p>
                        <Button size="lg" variant="primary" onClick={handleCTAClick}>
                            {messages.hero.cta}
                        </Button>
                    </div>
                </div>

                {/* Scroll Hint (Desktop) - Only show after mount */}
                {scrollScrubEnabled && (
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-muted)] animate-bounce z-10">
                        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
                        <div className="w-px h-8 bg-gradient-to-b from-[var(--color-text-muted)] to-transparent" />
                    </div>
                )}

                {/* Scroll Hint (Mobile) - Only show after mount */}
                {isMounted && !isDesktop && (
                    <p className="absolute bottom-6 left-0 right-0 text-center text-sm text-[var(--color-text-muted)] animate-bounce z-10">
                        {messages.hero.scrollHint}
                    </p>
                )}
            </div>
        </section>
    );
}

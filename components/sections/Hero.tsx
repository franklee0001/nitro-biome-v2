'use client';

import { Messages } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { useScrollVideo } from '@/hooks/useScrollVideo';
import { useEffect, useState } from 'react';

interface HeroProps {
    messages: Messages;
}

export function Hero({ messages }: HeroProps) {
    const [isMobile, setIsMobile] = useState(false);

    // Desktop scroll-controlled video
    const { videoRef, containerRef } = useScrollVideo({
        enabled: !isMobile,
    });

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleCTAClick = () => {
        const mechanismSection = document.getElementById('mechanism');
        if (mechanismSection) {
            mechanismSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="section pt-32 lg:pt-40" ref={containerRef}>
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Video Column */}
                    <div className="order-2 lg:order-1">
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                            {isMobile ? (
                                // Mobile: Autoplay loop fallback
                                <video
                                    src="/videos/hero-placeholder.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                // Desktop: Scroll-controlled
                                <video
                                    ref={videoRef}
                                    src="/videos/hero-placeholder.mp4"
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            )}

                            {/* TODO: Replace with actual hero video in Phase 2 */}
                            <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-secondary)] text-[var(--text-muted)]">
                                <p className="text-sm">Hero Video Placeholder</p>
                            </div>
                        </div>
                    </div>

                    {/* Text Column */}
                    <div className="order-1 lg:order-2 space-y-6">
                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--text-primary)] leading-tight">
                            {messages.hero.headline}
                        </h1>

                        <p className="text-lg lg:text-xl text-[var(--text-secondary)]">
                            {messages.hero.subheadline}
                        </p>

                        <div className="pt-4">
                            <Button
                                size="lg"
                                onClick={handleCTAClick}
                            >
                                {messages.hero.cta}
                            </Button>
                        </div>

                        {/* Scroll hint for mobile */}
                        {isMobile && (
                            <p className="text-sm text-[var(--text-muted)] pt-4">
                                {messages.hero.scrollHint}
                            </p>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}

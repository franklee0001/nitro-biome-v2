'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Design tokens
const COLORS = {
    // Card A: White theme
    cardA: {
        textPrimary: '#1A1A1A',
        textSecondary: '#4A4A4A',
        button: '#10B981',
        buttonText: '#FFFFFF',
    },
    // Card B: Graphite/Emerald theme
    cardB: {
        textPrimary: '#FFFFFF',
        textSecondary: 'rgba(255,255,255,0.7)',
        button: 'rgba(255,255,255,0.1)',
        buttonBorder: 'rgba(255,255,255,0.3)',
        buttonText: '#FFFFFF',
    },
};

interface CardMessages {
    title: string;
    subtitle: string;
    tooltip: string;
    button: string;
}

interface PostHeroActionCardsMessages {
    postHeroActionCards: {
        check: CardMessages;
        report: CardMessages;
    };
}

interface Props {
    messages: PostHeroActionCardsMessages;
}

// Individual Action Card Component (Background only)
function ActionCard({
    cardType,
    messages,
    href,
    trackingId,
    bgImage,
    isVisible,
    delay,
}: {
    cardType: 'check' | 'report';
    messages: CardMessages;
    href: string;
    trackingId: string;
    bgImage: string;
    isVisible: boolean;
    delay: number;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const colors = cardType === 'check' ? COLORS.cardA : COLORS.cardB;
    const isWhiteTheme = cardType === 'check';

    return (
        <a
            href={href}
            data-tracking={trackingId}
            className="action-card"
            style={{
                display: 'block',
                position: 'relative',
                width: '100%',
                paddingBottom: '62.5%', // 16:10 aspect ratio
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: isHovered
                    ? '0 24px 70px rgba(0,0,0,0.18)'
                    : '0 12px 40px rgba(0,0,0,0.08)',
                // Scroll Reveal: fade up + slight scale
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                    ? (isHovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)')
                    : 'translateY(40px) scale(0.98)',
                transition: `
                    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
                    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
                    box-shadow 0.4s ease
                `,
                textDecoration: 'none',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Image Layer */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                }}
            >
                <Image
                    src={bgImage}
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>

            {/* Gradient Overlay for text readability */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: isWhiteTheme
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 40%, transparent 70%)'
                        : 'linear-gradient(135deg, rgba(26,29,33,0.9) 0%, rgba(26,29,33,0.5) 40%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Text Content (Top Left) */}
            <div
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '8%',
                    width: '50%',
                    zIndex: 10,
                }}
            >
                <h3
                    style={{
                        fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                        fontWeight: 700,
                        color: colors.textPrimary,
                        marginBottom: '12px',
                        lineHeight: 1.3,
                    }}
                >
                    {messages.title}
                </h3>
                <p
                    style={{
                        fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                        color: colors.textSecondary,
                        lineHeight: 1.6,
                    }}
                >
                    {messages.subtitle}
                </p>
            </div>

            {/* CTA Button (Bottom Right) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '8%',
                    right: '8%',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                }}
            >
                {/* Tooltip */}
                <span
                    style={{
                        fontSize: '12px',
                        color: colors.textSecondary,
                        opacity: 0.8,
                    }}
                >
                    {messages.tooltip}
                </span>

                {/* + Button */}
                <div
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: isWhiteTheme ? colors.button : 'rgba(255,255,255,0.1)',
                        border: isWhiteTheme ? 'none' : `1px solid ${COLORS.cardB.buttonBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease, background 0.3s ease',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        style={{ color: isWhiteTheme ? colors.buttonText : '#FFFFFF' }}
                    >
                        <path
                            d="M10 4V16M4 10H16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            </div>
        </a>
    );
}

export function PostHeroActionCards({ messages }: Props) {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer for scroll reveal
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Once visible, stop observing
                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully in view
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const { postHeroActionCards } = messages;

    return (
        <>
            <style jsx global>{`
                @media (prefers-reduced-motion: reduce) {
                    .action-card {
                        transition: opacity 0.3s ease, box-shadow 0.3s ease !important;
                        transform: none !important;
                    }
                    .action-card:hover {
                        transform: none !important;
                    }
                }
            `}</style>

            <section
                ref={sectionRef}
                id="postHeroActionCards"
                style={{
                    position: 'relative',
                    zIndex: 10,
                    padding: '80px 0',
                    background: '#FAF8F3',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 24px',
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(1, 1fr)',
                            gap: '24px',
                        }}
                        className="cards-grid"
                    >
                        {/* Card 1: Check (White Theme) */}
                        <ActionCard
                            cardType="check"
                            messages={postHeroActionCards.check}
                            href="/check"
                            trackingId="postHero_check"
                            bgImage="/assets/postHeroActionCards/check_bg_base.webp"
                            isVisible={isVisible}
                            delay={0}
                        />

                        {/* Card 2: Report (Graphite/Emerald Theme) */}
                        <ActionCard
                            cardType="report"
                            messages={postHeroActionCards.report}
                            href="/report"
                            trackingId="postHero_report"
                            bgImage="/assets/postHeroActionCards/report_bg_base.webp"
                            isVisible={isVisible}
                            delay={120}
                        />
                    </div>
                </div>
            </section>

            <style jsx global>{`
                @media (min-width: 768px) {
                    .cards-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
            `}</style>
        </>
    );
}

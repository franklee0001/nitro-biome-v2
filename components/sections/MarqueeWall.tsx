'use client';

import { useMemo } from 'react';

// Design tokens as constants (Dark Lab theme)
const COLORS = {
    darkLab: '#0A0A0B',
    cardBg: 'rgba(255, 255, 255, 0.03)',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    text: 'rgba(255, 255, 255, 0.9)',
    muted: 'rgba(255, 255, 255, 0.5)',
    accent: 'rgba(74, 222, 128, 0.8)',
};

interface Review {
    tag: string;
    body: string;
    author: string;
}

interface MarqueeWallMessages {
    marqueeWall: {
        label: string;
        headline: string;
        subCopy: string;
        cta: string;
        reviews: Review[];
    };
}

interface MarqueeWallProps {
    messages: MarqueeWallMessages;
}

// Review Card Component
function ReviewCard({ review, floatDelay }: { review: Review; floatDelay: number }) {
    return (
        <div
            className="marquee-card"
            style={{
                animationDelay: `${floatDelay}s`,
            }}
        >
            {/* Tag */}
            <span
                style={{
                    display: 'inline-block',
                    marginBottom: '12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    color: COLORS.accent,
                    border: `1px solid rgba(74, 222, 128, 0.3)`,
                    padding: '4px 12px',
                    borderRadius: '9999px',
                }}
            >
                {review.tag}
            </span>

            {/* Body */}
            <p
                style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    marginBottom: '16px',
                    color: COLORS.text,
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
            >
                {review.body}
            </p>

            {/* Author */}
            <p
                style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: COLORS.muted,
                }}
            >
                {review.author}
            </p>
        </div>
    );
}

// Marquee Rail Component
function MarqueeRail({
    reviews,
    direction,
    duration,
    railIndex,
}: {
    reviews: Review[];
    direction: 'left' | 'right';
    duration: number;
    railIndex: number;
}) {
    // Duplicate reviews for seamless loop
    const duplicatedReviews = [...reviews, ...reviews];

    // Generate consistent delays based on index (avoid hydration mismatch)
    const delays = useMemo(() => {
        return duplicatedReviews.map((_, i) => {
            // Use deterministic formula instead of Math.random()
            const seed = (railIndex * 100 + i * 7) % 17;
            return -(seed * 0.5);
        });
    }, [duplicatedReviews.length, railIndex]);

    const animationClass = direction === 'left' ? 'marquee-animate-left' : 'marquee-animate-right';

    return (
        <div style={{ overflow: 'hidden' }}>
            <div
                className={`marquee-track ${animationClass}`}
                style={{
                    animationDuration: `${duration}s`,
                }}
            >
                {duplicatedReviews.map((review, idx) => (
                    <ReviewCard
                        key={`${review.author}-${idx}`}
                        review={review}
                        floatDelay={delays[idx]}
                    />
                ))}
            </div>
        </div>
    );
}

export function MarqueeWall({ messages }: MarqueeWallProps) {
    const { marqueeWall } = messages;

    // Divide reviews into 3 rails (8 each)
    const rail1Reviews = marqueeWall.reviews.slice(0, 8);
    const rail2Reviews = marqueeWall.reviews.slice(8, 16);
    const rail3Reviews = marqueeWall.reviews.slice(16, 24);

    return (
        <>
            {/* Scoped CSS for animations */}
            <style jsx global>{`
                @keyframes marquee-left {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    from { transform: translateX(-50%); }
                    to { transform: translateX(0); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(0.5deg); }
                }

                .marquee-track {
                    display: flex;
                    gap: 24px;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                .marquee-animate-left {
                    animation-name: marquee-left;
                }
                .marquee-animate-right {
                    animation-name: marquee-right;
                }

                .marquee-card {
                    width: 360px;
                    min-height: 200px;
                    flex-shrink: 0;
                    padding: 24px;
                    border-radius: 20px;
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                    animation: float 6s ease-in-out infinite;
                    transition: transform 0.3s ease, z-index 0s;
                }
                .marquee-card:hover {
                    transform: scale(1.03);
                    z-index: 10;
                }

                .marquee-wall-container:hover .marquee-track {
                    animation-play-state: paused;
                }

                @media (max-width: 767px) {
                    .marquee-card {
                        width: 280px;
                        min-height: 180px;
                        padding: 20px;
                    }
                }
                @media (min-width: 768px) and (max-width: 1023px) {
                    .marquee-card {
                        width: 320px;
                    }
                }
            `}</style>

            <section
                id="marquee-wall"
                className="relative z-10 overflow-hidden"
                style={{
                    backgroundColor: COLORS.darkLab,
                    paddingTop: '80px',
                    paddingBottom: '80px',
                }}
            >
                {/* Subtle gradient accents */}
                <div
                    className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
                    style={{
                        opacity: 0.2,
                        background: 'radial-gradient(circle, rgba(74, 110, 46, 0.4) 0%, transparent 70%)',
                    }}
                />
                <div
                    className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
                    style={{
                        opacity: 0.15,
                        background: 'radial-gradient(circle, rgba(74, 110, 46, 0.3) 0%, transparent 70%)',
                    }}
                />

                <div
                    style={{
                        maxWidth: '1800px',
                        margin: '0 auto',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '48px',
                        }}
                        className="lg:flex-row lg:gap-16"
                    >
                        {/* Left Column - Sticky Text */}
                        <div
                            className="lg:w-[35%] lg:sticky lg:top-32 lg:self-start"
                            style={{ flexShrink: 0 }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Label */}
                                <span
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        color: COLORS.muted,
                                    }}
                                >
                                    {marqueeWall.label}
                                </span>

                                {/* Headline */}
                                <h2
                                    style={{
                                        fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                                        fontWeight: 700,
                                        lineHeight: 1.2,
                                        whiteSpace: 'pre-line',
                                        color: COLORS.text,
                                    }}
                                >
                                    {marqueeWall.headline}
                                </h2>

                                {/* Sub-copy */}
                                <p
                                    style={{
                                        fontSize: '16px',
                                        lineHeight: 1.6,
                                        maxWidth: '400px',
                                        color: COLORS.muted,
                                    }}
                                >
                                    {marqueeWall.subCopy}
                                </p>

                                {/* CTA Button */}
                                <a
                                    href="#"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '12px 24px',
                                        marginTop: '8px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: COLORS.text,
                                        border: `1px solid ${COLORS.cardBorder}`,
                                        borderRadius: '9999px',
                                        textDecoration: 'none',
                                        transition: 'background-color 0.3s ease',
                                        width: 'fit-content',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                    {marqueeWall.cta}
                                    <svg
                                        style={{ width: '16px', height: '16px' }}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Right Column - Marquee Rails */}
                        <div className="lg:w-[65%] marquee-wall-container" style={{ flexGrow: 1 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                {/* Rail 1 - Left to Right, 70s */}
                                <MarqueeRail
                                    reviews={rail1Reviews}
                                    direction="left"
                                    duration={70}
                                    railIndex={0}
                                />

                                {/* Rail 2 - Right to Left, 80s (slower) */}
                                <MarqueeRail
                                    reviews={rail2Reviews}
                                    direction="right"
                                    duration={80}
                                    railIndex={1}
                                />

                                {/* Rail 3 - Left to Right, 65s (fastest) */}
                                <MarqueeRail
                                    reviews={rail3Reviews}
                                    direction="left"
                                    duration={65}
                                    railIndex={2}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

// ===== Types =====
interface TimelineStep {
    id: string;
    time: string;
    title: string;
    description: string;
}

interface MechanismMessages {
    mechanism: {
        title: string;
        steps: TimelineStep[];
    };
}

interface Props {
    messages: MechanismMessages;
}

// ===== CSS Variables =====
const cssVars = {
    // Colors
    colorBg: '#FFFFFF',
    colorTextPrimary: '#1a1a1a',
    colorTextSecondary: '#666666',
    colorTextMuted: '#999999',
    colorLine: '#CCCCCC',
    colorDotActive: '#1a1a1a',
    colorDotInactive: '#CCCCCC',

    // Card sizes (Desktop default)
    cardActiveWidth: 320,
    cardActiveHeight: 400,
    cardInactiveWidth: 160,
    cardInactiveHeight: 160,

    // Spacing
    cardGap: 24,

    // Transitions
    transitionFast: '0.2s ease',
    transitionNormal: '0.4s ease',
    transitionSlow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
};

// ===== Timeline Images =====
const TIMELINE_IMAGES = [
    '/images/timeline/step-0-woman.jpg',
    '/images/timeline/step-1-nanobubble.jpg',
    '/images/timeline/step-2-vessel.jpg',
    '/images/timeline/step-3-circulation.jpg',
    '/images/timeline/step-4-cell.jpg',
    '/images/timeline/step-5-vascular.jpg',
    '/images/timeline/step-6-morning.jpg',
];

// ===== Timeline Card Component =====
function TimelineCard({
    step,
    index,
    isActive,
    onClick,
    cardSizes,
}: {
    step: TimelineStep;
    index: number;
    isActive: boolean;
    onClick: () => void;
    cardSizes: { activeW: number; activeH: number; inactiveW: number; inactiveH: number };
}) {
    const [isHovered, setIsHovered] = useState(false);

    const imageWidth = isActive ? cardSizes.activeW : cardSizes.inactiveW;
    const imageHeight = isActive ? cardSizes.activeH : cardSizes.inactiveH;

    return (
        <article
            className="timeline-card"
            onClick={onClick}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
            role="button"
            tabIndex={0}
            aria-selected={isActive}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                cursor: isActive ? 'default' : 'pointer',
                transition: `all ${cssVars.transitionSlow}`,
            }}
        >
            {/* Image Wrapper */}
            <div
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#F5F5F5',
                    width: imageWidth,
                    height: imageHeight,
                    borderRadius: 0,
                    transition: `width ${cssVars.transitionSlow}, height ${cssVars.transitionSlow}, box-shadow ${cssVars.transitionNormal}`,
                    boxShadow: !isActive && isHovered ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
                    transform: !isActive && isHovered ? 'scale(0.98)' : 'scale(1)',
                }}
            >
                <Image
                    src={TIMELINE_IMAGES[index] || '/images/timeline/placeholder.jpg'}
                    alt={step.title}
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transition: `transform ${cssVars.transitionNormal}`,
                        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                    }}
                />
            </div>

            {/* Progress Line */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 20,
                    marginTop: 16,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* Dotted Line */}
                <span
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: index === 6 ? 0 : -cssVars.cardGap,
                        height: 1,
                        backgroundImage: `linear-gradient(to right, ${cssVars.colorLine} 4px, transparent 4px)`,
                        backgroundSize: '8px 1px',
                        backgroundRepeat: 'repeat-x',
                        transform: 'translateY(-50%)',
                    }}
                />
                {/* Progress Dot */}
                <span
                    style={{
                        position: 'relative',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: isActive ? cssVars.colorDotActive : cssVars.colorDotInactive,
                        zIndex: 1,
                        transition: `background-color ${cssVars.transitionNormal}, transform ${cssVars.transitionNormal}`,
                        transform: isActive ? 'scale(1.25)' : 'scale(1)',
                    }}
                />
            </div>

            {/* Time Label */}
            <div
                style={{
                    marginTop: 12,
                    fontFamily: "'Roboto Mono', 'SF Mono', monospace",
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '0.02em',
                    color: isActive ? cssVars.colorTextPrimary : (isHovered ? cssVars.colorTextSecondary : cssVars.colorTextMuted),
                    transition: `color ${cssVars.transitionNormal}`,
                }}
            >
                {step.time}
            </div>

            {/* Card Content (Active Only) */}
            <div
                style={{
                    marginTop: 20,
                    maxWidth: 320,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                    transition: `opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s`,
                    display: isActive ? 'block' : 'none',
                }}
            >
                <h3
                    style={{
                        fontFamily: "'Pretendard', sans-serif",
                        fontSize: 18,
                        fontWeight: 600,
                        lineHeight: 1.4,
                        color: cssVars.colorTextPrimary,
                        marginBottom: 12,
                    }}
                >
                    {step.title}
                </h3>
                <p
                    style={{
                        fontFamily: "'Pretendard', sans-serif",
                        fontSize: 15,
                        fontWeight: 400,
                        lineHeight: 1.6,
                        color: cssVars.colorTextSecondary,
                        margin: 0,
                    }}
                >
                    {step.description}
                </p>
            </div>
        </article>
    );
}

// ===== Main Component =====
export function Mechanism({ messages }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [cardSizes, setCardSizes] = useState({
        activeW: 320,
        activeH: 400,
        inactiveW: 160,
        inactiveH: 160,
    });

    // Responsive card sizes
    useEffect(() => {
        const updateSizes = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setCardSizes({ activeW: 280, activeH: 350, inactiveW: 80, inactiveH: 80 });
            } else if (width < 1200) {
                setCardSizes({ activeW: 300, activeH: 375, inactiveW: 120, inactiveH: 120 });
            } else if (width >= 1440) {
                setCardSizes({ activeW: 360, activeH: 450, inactiveW: 180, inactiveH: 180 });
            } else {
                setCardSizes({ activeW: 320, activeH: 400, inactiveW: 160, inactiveH: 160 });
            }
        };

        updateSizes();
        window.addEventListener('resize', updateSizes);
        return () => window.removeEventListener('resize', updateSizes);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && activeIndex > 0) {
                setActiveIndex(activeIndex - 1);
            } else if (e.key === 'ArrowRight' && activeIndex < steps.length - 1) {
                setActiveIndex(activeIndex + 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex]);

    // Scroll to active card
    const scrollToActive = useCallback(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll('.timeline-card');
        const activeCard = cards[activeIndex] as HTMLElement;
        if (activeCard) {
            const scrollLeft = activeCard.offsetLeft - 40;
            containerRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }, [activeIndex]);

    useEffect(() => {
        scrollToActive();
    }, [activeIndex, scrollToActive]);

    const { mechanism } = messages;
    const steps = mechanism.steps;

    const handlePrev = () => {
        if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    };

    const handleNext = () => {
        if (activeIndex < steps.length - 1) setActiveIndex(activeIndex + 1);
    };

    // Format title with line breaks
    const formattedTitle = mechanism.title.split('\n').map((line, i) => (
        <span key={i}>
            {line}
            {i < mechanism.title.split('\n').length - 1 && <br />}
        </span>
    ));

    return (
        <>
            <style jsx global>{`
                @media (prefers-reduced-motion: reduce) {
                    .timeline-card {
                        transition: none !important;
                    }
                    .timeline-card * {
                        transition: none !important;
                    }
                }
            `}</style>

            <section
                id="mechanism"
                style={{
                    width: '100%',
                    maxWidth: 1440,
                    margin: '0 auto',
                    padding: '80px 40px',
                    backgroundColor: cssVars.colorBg,
                    overflow: 'hidden',
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 48,
                        flexWrap: 'wrap',
                        gap: 24,
                    }}
                >
                    <h2
                        style={{
                            fontFamily: "'Pretendard', sans-serif",
                            fontSize: 'clamp(28px, 4vw, 42px)',
                            fontWeight: 700,
                            lineHeight: 1.2,
                            color: cssVars.colorTextPrimary,
                            letterSpacing: '-0.02em',
                            maxWidth: 500,
                            margin: 0,
                        }}
                    >
                        {formattedTitle}
                    </h2>

                    {/* Navigation Arrows */}
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                        <button
                            onClick={handlePrev}
                            disabled={activeIndex === 0}
                            aria-label="이전"
                            style={{
                                width: 48,
                                height: 48,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: 'none',
                                cursor: activeIndex === 0 ? 'not-allowed' : 'pointer',
                                opacity: activeIndex === 0 ? 0.2 : 1,
                                transition: `opacity ${cssVars.transitionFast}`,
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={cssVars.colorTextPrimary} strokeWidth="1.5">
                                <path d="M15 18L9 12L15 6" />
                            </svg>
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={activeIndex === steps.length - 1}
                            aria-label="다음"
                            style={{
                                width: 48,
                                height: 48,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: 'none',
                                cursor: activeIndex === steps.length - 1 ? 'not-allowed' : 'pointer',
                                opacity: activeIndex === steps.length - 1 ? 0.2 : 1,
                                transition: `opacity ${cssVars.transitionFast}`,
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={cssVars.colorTextPrimary} strokeWidth="1.5">
                                <path d="M9 18L15 12L9 6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Timeline Track */}
                <div style={{ position: 'relative', width: '100%' }}>
                    <div
                        ref={containerRef}
                        style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: cssVars.cardGap,
                            overflowX: 'auto',
                            scrollBehavior: 'smooth',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            paddingBottom: 20,
                            msOverflowStyle: 'none',
                        }}
                        className="timeline-cards-container"
                    >
                        {steps.map((step, index) => (
                            <TimelineCard
                                key={step.id}
                                step={step}
                                index={index}
                                isActive={index === activeIndex}
                                onClick={() => setActiveIndex(index)}
                                cardSizes={cardSizes}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <style jsx global>{`
                .timeline-cards-container::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </>
    );
}

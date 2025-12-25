'use client';

import { Messages } from '@/lib/i18n';
import { useLayoutEffect, useRef, useState, useEffect, useCallback, useId } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassButton } from '@/components/ui/LiquidGlass';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface JourneySectionProps {
    messages: Messages;
}

const CREAM_BG = '#F6F2EE';

// 8-pointed star path CENTERED AT ORIGIN (0,0)
// This allows clean scaling from center
const STAR_PATH_CENTERED = 'M0,-50 L8,-15 L50,0 L8,15 L0,50 L-8,15 L-50,0 L-8,-15 Z';

const PHASE = {
    HEADLINE_FADE_START: 0.10,
    HEADLINE_FADE_END: 0.22,
    STAR_SCALE_START: 0.05,
    STAR_SCALE_END: 0.60,
    CARD_START: 0.68,
    CARD_END: 0.88,
};

export function JourneySection({ messages }: JourneySectionProps) {
    const maskId = `cream-mask-${useId().replace(/:/g, '')}`;

    const sectionRef = useRef<HTMLElement>(null);
    const starGroupRef = useRef<SVGGElement>(null);
    const headlineBlockRef = useRef<HTMLDivElement>(null);
    const headlineTextRef = useRef<HTMLHeadingElement>(null);
    const cardWrapperRef = useRef<HTMLDivElement>(null);

    const [productError, setProductError] = useState(false);
    const [ruleWidth, setRuleWidth] = useState(0);
    const [scales, setScales] = useState({ initial: 2, final: 50 });

    const journey = messages.journey;

    const measureHeadline = useCallback(() => {
        const headline = headlineTextRef.current;
        if (!headline) return;
        setRuleWidth(headline.getBoundingClientRect().width);
    }, []);

    const computeScales = useCallback(() => {
        if (typeof window === 'undefined') return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const viewportDiagonal = Math.sqrt(vw * vw + vh * vh);

        // The SVG viewBox is 1000x1000, scaled to cover viewport via xMidYMid slice
        // The actual viewport-to-viewBox ratio
        const viewBoxSize = 1000;
        const coverScale = Math.max(vw, vh) / viewBoxSize;

        // Star path is 100 units wide (from -50 to 50)
        // At scale=1 in viewBox, star is 100 * coverScale pixels on screen
        const starBaseSize = 100 * coverScale;

        // Initial: star should appear ~180px on screen
        const targetInitialPx = vw < 640 ? 140 : vw < 768 ? 160 : 180;
        const initial = targetInitialPx / starBaseSize;

        // Final: star hole must cover viewport diagonal with buffer
        const final = (viewportDiagonal * 1.5) / starBaseSize;

        setScales({
            initial: Math.max(initial, 1.5),
            final: Math.max(final, 40),
        });
    }, []);

    useEffect(() => {
        const update = () => {
            measureHeadline();
            computeScales();
        };

        if (document.fonts?.ready) {
            document.fonts.ready.then(update);
        }
        update();

        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [measureHeadline, computeScales, journey.headline]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const timeoutId = setTimeout(() => {
            const ctx = gsap.context(() => {
                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                const starGroup = starGroupRef.current;
                const headlineBlock = headlineBlockRef.current;
                const headlineText = headlineTextRef.current;
                const cardWrapper = cardWrapperRef.current;

                if (!starGroup || !headlineBlock || !headlineText || !cardWrapper) {
                    console.warn('[JourneySection] Missing refs');
                    return;
                }

                if (reducedMotion) {
                    gsap.set(starGroup, { scale: scales.final });
                    gsap.set(headlineBlock, { opacity: 0 });
                    gsap.set(cardWrapper, { opacity: 1, y: 0, filter: 'blur(0px)' });

                    ScrollTrigger.create({
                        trigger: section,
                        start: 'top top',
                        end: '+=100vh',
                        pin: true,
                        pinSpacing: true,
                    });
                    return;
                }

                // Initial states
                gsap.set(headlineBlock, { opacity: 1, y: 0 });
                gsap.set(headlineText, { letterSpacing: '0.02em' });
                gsap.set(starGroup, { scale: scales.initial, transformOrigin: 'center center' });
                gsap.set(cardWrapper, { opacity: 0, y: 50, filter: 'blur(5px)' });

                const tl = gsap.timeline();

                // Headline subtle breathing
                tl.to(headlineText, {
                    letterSpacing: '0.04em',
                    ease: 'power1.inOut',
                    duration: PHASE.HEADLINE_FADE_START,
                }, 0);

                // Headline fades out
                tl.to(headlineBlock, {
                    opacity: 0,
                    y: -25,
                    ease: 'power2.inOut',
                    duration: PHASE.HEADLINE_FADE_END - PHASE.HEADLINE_FADE_START,
                }, PHASE.HEADLINE_FADE_START);

                // Star HOLE expands - animating the mask group scale
                // This makes the transparent window grow, revealing more background
                tl.to(starGroup, {
                    scale: scales.final,
                    ease: 'power2.inOut',
                    duration: PHASE.STAR_SCALE_END - PHASE.STAR_SCALE_START,
                }, PHASE.STAR_SCALE_START);

                // Card appears
                tl.to(cardWrapper, {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    ease: 'power2.out',
                    duration: PHASE.CARD_END - PHASE.CARD_START,
                }, PHASE.CARD_START);

                ScrollTrigger.create({
                    trigger: section,
                    start: 'top top',
                    end: '+=300vh',
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                    animation: tl,
                    invalidateOnRefresh: true,
                });
            }, section);

            return () => ctx.revert();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [scales]);

    useEffect(() => {
        const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
        return () => clearTimeout(timer);
    }, [ruleWidth, scales]);

    return (
        <section
            id="journey"
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden"
        >
            {/* =============================================
                LAYER STRUCTURE:

                z-0:  Background image (full-bleed, static, never moves)
                z-10: SVG cream overlay with star MASK HOLE
                z-20: Headline
                z-30: Card

                The star is a HOLE in the cream overlay (black in mask = transparent).
                Scaling the star group expands the hole, revealing the background.
                The background image is NOT inside the star - it's behind everything.
            ============================================= */}

            {/* z-0: Full background image - exists behind everything, never moves */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/journey-bg.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    priority
                    onLoad={() => setTimeout(() => ScrollTrigger.refresh(), 100)}
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" aria-hidden="true" />
            </div>

            {/* z-10: SVG CREAM OVERLAY with STAR HOLE
                - The SVG covers the full viewport
                - A <mask> defines: white rect (cream visible) + black star (hole/transparent)
                - The cream rect has this mask applied
                - Through the hole, the background (z-0) is visible
                - GSAP scales the star group to expand the hole */}
            <svg
                className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
            >
                <defs>
                    <mask id={maskId}>
                        {/* White = cream overlay is VISIBLE */}
                        <rect width="1000" height="1000" fill="white" />
                        {/* Black star = HOLE (cream is transparent here, background shows through) */}
                        <g
                            ref={starGroupRef}
                            transform="translate(500, 580)"
                        >
                            <path d={STAR_PATH_CENTERED} fill="black" />
                        </g>
                    </mask>
                </defs>
                {/* Cream overlay with mask applied - star area becomes transparent */}
                <rect
                    width="1000"
                    height="1000"
                    fill={CREAM_BG}
                    mask={`url(#${maskId})`}
                />
            </svg>

            {/* z-20: Headline block */}
            <div
                ref={headlineBlockRef}
                className="absolute z-20 pointer-events-none will-change-[opacity,transform]"
                style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    marginTop: -90,
                }}
            >
                <div className="flex flex-col items-center px-4">
                    <div
                        className="h-px bg-neutral-400/70 mb-4 sm:mb-5 md:mb-6"
                        style={{ width: ruleWidth > 0 ? ruleWidth : 'auto' }}
                        aria-hidden="true"
                    />
                    <h2
                        ref={headlineTextRef}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-neutral-800 leading-tight text-center whitespace-nowrap will-change-[letter-spacing]"
                        style={{
                            fontFamily: 'var(--font-serif, Georgia, serif)',
                            letterSpacing: '0.02em',
                        }}
                    >
                        {journey.headline}
                    </h2>
                    <div
                        className="h-px bg-neutral-400/70 mt-4 sm:mt-5 md:mt-6"
                        style={{ width: ruleWidth > 0 ? ruleWidth : 'auto' }}
                        aria-hidden="true"
                    />
                </div>
            </div>

            {/* z-30: Card - appears in Stage C within same pinned section */}
            <div
                ref={cardWrapperRef}
                className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none will-change-[opacity,transform,filter]"
                style={{ opacity: 0 }}
            >
                <div className="w-full max-w-5xl mx-4 sm:mx-6 md:mx-8 pointer-events-auto">
                    <div
                        className="relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl backdrop-saturate-150 bg-white/12 border border-white/25 ring-1 ring-black/5"
                        style={{
                            boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255,255,255,0.1)',
                        }}
                    >
                        <div
                            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                            aria-hidden="true"
                        />
                        <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent"
                            aria-hidden="true"
                        />
                        <div
                            className="pointer-events-none absolute top-0 left-0 w-1/2 h-1/3 bg-gradient-to-br from-white/10 via-transparent to-transparent"
                            aria-hidden="true"
                        />

                        <div className="relative z-10 flex flex-col lg:flex-row">
                            <div className="relative w-full lg:w-2/5 aspect-[4/3] lg:aspect-auto lg:min-h-[360px] xl:min-h-[420px] bg-white/5">
                                {!productError ? (
                                    <Image
                                        src="/images/journey-product.png"
                                        alt="Product"
                                        fill
                                        className="object-contain object-center p-6 sm:p-8"
                                        onError={() => setProductError(true)}
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/10 flex items-center justify-center">
                                            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 p-6 sm:p-8 lg:p-10 xl:p-14 flex flex-col justify-center">
                                <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/50 mb-3 sm:mb-4">
                                    {journey.cardLabel}
                                </span>
                                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight">
                                    {journey.cardTitle}
                                </h3>
                                <p className="text-white/75 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 lg:mb-10">
                                    {journey.cardDescription}
                                </p>
                                <div>
                                    <GlassButton size="lg" onDark={true}>
                                        {journey.cta}
                                        <svg
                                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </GlassButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

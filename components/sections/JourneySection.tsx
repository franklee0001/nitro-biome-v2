'use client';

import { Messages } from '@/lib/i18n';
import { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassButton } from '@/components/ui/LiquidGlass';

// Register GSAP plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface JourneySectionProps {
    messages: Messages;
}

// Colors
const CREAM_BG = '#F6F2EE';

// Animation phase boundaries (as fraction of total scroll: 0-1)
const STAGE_A_END = 0.25;           // Headline fades out by this point
const STAGE_B_START = 0.15;         // Star starts scaling
const STAGE_B_END = 0.65;           // Star fully expanded
const STAGE_B_BG_START = 0.50;      // Full background starts fading in
const STAGE_B_STAR_FADE = 0.60;     // Star starts fading out
const STAGE_C_START = 0.70;         // Card starts appearing

// 8-pointed star path (centered at 50,50 in a 100x100 viewBox)
const STAR_PATH = 'M50,0 L58,35 L100,50 L58,65 L50,100 L42,65 L0,50 L42,35 Z';

export function JourneySection({ messages }: JourneySectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const stageARef = useRef<HTMLDivElement>(null);
    const headlineBlockRef = useRef<HTMLDivElement>(null);
    const headlineTextRef = useRef<HTMLHeadingElement>(null);
    const starWrapperRef = useRef<HTMLDivElement>(null);
    const starGroupRef = useRef<SVGGElement>(null);
    const fullBgRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const [productError, setProductError] = useState(false);
    const [scaleEnd, setScaleEnd] = useState(25); // Default, will be computed

    const journey = messages.journey;

    // Compute dynamic STAR_SCALE_END based on viewport and star size
    const computeScaleEnd = useCallback(() => {
        const starWrapper = starWrapperRef.current;
        if (!starWrapper) return 25;

        const starPx = starWrapper.offsetWidth;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const diagonal = Math.sqrt(vw * vw + vh * vh);
        // Scale needed to cover the diagonal, plus 15% buffer
        const computedScale = (diagonal / starPx) * 1.15;
        return Math.max(computedScale, 15); // Minimum scale of 15
    }, []);

    // Update scale on mount and resize
    useEffect(() => {
        const updateScale = () => {
            const newScale = computeScaleEnd();
            setScaleEnd(newScale);
        };

        updateScale();

        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, [computeScaleEnd]);

    // GSAP ScrollTrigger Animation
    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        // Wait a frame for refs to be ready
        const timeoutId = setTimeout(() => {
            const ctx = gsap.context(() => {
                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                const section = sectionRef.current;
                const stageA = stageARef.current;
                const headlineBlock = headlineBlockRef.current;
                const headlineText = headlineTextRef.current;
                const starWrapper = starWrapperRef.current;
                const starGroup = starGroupRef.current;
                const fullBg = fullBgRef.current;
                const card = cardRef.current;

                if (!section || !stageA || !headlineBlock || !headlineText || !starWrapper || !starGroup || !fullBg || !card) {
                    console.warn('[JourneySection] Missing refs for animation');
                    return;
                }

                // Reduced motion: show static Stage A, then jump to Stage C
                if (reducedMotion) {
                    gsap.set(stageA, { opacity: 1 });
                    gsap.set(fullBg, { opacity: 0 });
                    gsap.set(card, { opacity: 0 });

                    ScrollTrigger.create({
                        id: 'JourneySection-reduced',
                        trigger: section,
                        start: 'top top',
                        end: '+=100%',
                        pin: true,
                        pinSpacing: true,
                        onUpdate: (self) => {
                            if (self.progress > 0.5) {
                                gsap.set(stageA, { opacity: 0 });
                                gsap.set(fullBg, { opacity: 1 });
                                gsap.set(card, { opacity: 1, y: 0, filter: 'blur(0px)' });
                            } else {
                                gsap.set(stageA, { opacity: 1 });
                                gsap.set(fullBg, { opacity: 0 });
                                gsap.set(card, { opacity: 0 });
                            }
                        },
                    });
                    return;
                }

                // Compute dynamic scale
                const dynamicScaleEnd = computeScaleEnd();

                // 1. Set initial states
                gsap.set(stageA, { opacity: 1 });
                gsap.set(headlineText, {
                    letterSpacing: '0.02em',
                    y: 0,
                });
                gsap.set(starGroup, { scale: 1, opacity: 1 });
                gsap.set(fullBg, { opacity: 0 });
                gsap.set(card, { opacity: 0, y: 80, filter: 'blur(8px)' });

                // 2. Build Master Timeline
                const tl = gsap.timeline();

                // Stage A: Headline subtle motion (letter-spacing breathe + micro y drift)
                // Duration: 0 → STAGE_A_END
                tl.to(headlineText, {
                    letterSpacing: '0.05em',
                    y: -6,
                    ease: 'power1.inOut',
                    duration: STAGE_A_END,
                }, 0);

                // Stage A → B transition: Headline block fades out
                tl.to(headlineBlock, {
                    opacity: 0,
                    y: -30,
                    ease: 'power2.inOut',
                    duration: 0.12,
                }, STAGE_A_END - 0.08);

                // Stage B: Star scales up to cover viewport
                // Duration: STAGE_B_START → STAGE_B_END
                tl.to(starGroup, {
                    scale: dynamicScaleEnd,
                    ease: 'power2.inOut',
                    duration: STAGE_B_END - STAGE_B_START,
                }, STAGE_B_START);

                // Stage B (mid→end): Full background fades in
                // Duration: STAGE_B_BG_START → STAGE_B_END
                tl.to(fullBg, {
                    opacity: 1,
                    ease: 'power1.inOut',
                    duration: STAGE_B_END - STAGE_B_BG_START,
                }, STAGE_B_BG_START);

                // Stage B (end): Star fades out to avoid edge artifacts
                // Duration: STAGE_B_STAR_FADE → STAGE_B_END
                tl.to(starGroup, {
                    opacity: 0,
                    ease: 'power1.in',
                    duration: STAGE_B_END - STAGE_B_STAR_FADE,
                }, STAGE_B_STAR_FADE);

                // Stage C: Card rises up with blur resolve
                // Duration: STAGE_C_START → 1.0
                tl.to(card, {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    ease: 'power2.out',
                    duration: 1 - STAGE_C_START,
                }, STAGE_C_START);

                // 3. Create ScrollTrigger
                ScrollTrigger.create({
                    id: 'JourneySection',
                    trigger: section,
                    start: 'top top',
                    end: '+=280%',
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.8,
                    anticipatePin: 1,
                    animation: tl,
                    invalidateOnRefresh: true,
                });
            }, sectionRef);

            return () => ctx.revert();
        }, 50);

        return () => clearTimeout(timeoutId);
    }, [scaleEnd, computeScaleEnd]);

    // Refresh ScrollTrigger on scale change
    useEffect(() => {
        ScrollTrigger.refresh();
    }, [scaleEnd]);

    return (
        <section
            id="journey"
            ref={sectionRef}
            className="relative w-full min-h-screen"
            style={{ backgroundColor: CREAM_BG }}
        >
            {/* ============================================
                Z-INDEX LAYERS:
                z-0:  Cream background (base)
                z-10: Full background image (starts hidden)
                z-20: Stage A group (headline + star)
                z-30: Card
            ============================================ */}

            {/* Layer 0: Cream background (always visible initially) */}
            <div
                className="absolute inset-0 z-0"
                style={{ backgroundColor: CREAM_BG }}
            />

            {/* Layer 1 (z-10): Full background image (fades in during Stage B) */}
            <div
                ref={fullBgRef}
                className="absolute inset-0 z-10 will-change-[opacity]"
                style={{ opacity: 0 }}
            >
                <Image
                    src="/images/journey-bg.png"
                    alt="Journey background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>

            {/* Layer 2 (z-20): Stage A Group - Headline + Star in single column */}
            <div
                ref={stageARef}
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            >
                <div className="flex flex-col items-center">
                    {/* Headline Block (inline-block so rules match text width) */}
                    <div
                        ref={headlineBlockRef}
                        className="flex flex-col items-center will-change-transform"
                    >
                        <div className="inline-block text-center">
                            {/* Top rule - full width of inline-block parent */}
                            <div className="w-full h-px bg-neutral-400 mb-6 sm:mb-8" />

                            <h2
                                ref={headlineTextRef}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-neutral-800 leading-tight will-change-[letter-spacing,transform] px-4"
                                style={{
                                    fontFamily: 'var(--font-serif, Georgia, serif)',
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {journey.headline}
                            </h2>

                            {/* Bottom rule - full width of inline-block parent */}
                            <div className="w-full h-px bg-neutral-400 mt-6 sm:mt-8" />
                        </div>
                    </div>

                    {/* Star Window - Below headline with spacing */}
                    <div
                        ref={starWrapperRef}
                        className="mt-8 sm:mt-10 md:mt-12 w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px]"
                    >
                        <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full"
                            style={{ overflow: 'visible' }}
                        >
                            <defs>
                                <clipPath id="star-clip">
                                    <path d={STAR_PATH} />
                                </clipPath>
                            </defs>
                            <g
                                ref={starGroupRef}
                                style={{ transformOrigin: '50px 50px' }}
                            >
                                {/* Cream fill outside star (covers whole viewBox) */}
                                {/* Image clipped to star shape */}
                                <image
                                    href="/images/journey-bg.png"
                                    x="-150"
                                    y="-150"
                                    width="400"
                                    height="400"
                                    preserveAspectRatio="xMidYMid slice"
                                    clipPath="url(#star-clip)"
                                />
                                {/* Subtle star border */}
                                <path
                                    d={STAR_PATH}
                                    fill="none"
                                    stroke="rgba(0,0,0,0.08)"
                                    strokeWidth="0.4"
                                />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Layer 3 (z-30): Card (appears in Stage C) - Liquid Glass */}
            <div
                ref={cardRef}
                className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none will-change-[transform,opacity,filter]"
                style={{ opacity: 0 }}
            >
                <div className="w-full max-w-5xl mx-4 sm:mx-6 md:mx-8 pointer-events-auto">
                    {/* Liquid Glass Card Container */}
                    <div
                        className="relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl backdrop-saturate-150 bg-white/12 border border-white/25 ring-1 ring-black/5"
                        style={{
                            boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255,255,255,0.1)',
                        }}
                    >
                        {/* Inner highlight - top edge shine */}
                        <div
                            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                            aria-hidden="true"
                        />
                        {/* Inner glow - subtle radial from top */}
                        <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent"
                            aria-hidden="true"
                        />
                        {/* Specular highlight - corner accent */}
                        <div
                            className="pointer-events-none absolute top-0 left-0 w-1/2 h-1/3 bg-gradient-to-br from-white/10 via-transparent to-transparent"
                            aria-hidden="true"
                        />

                        <div className="relative z-10 flex flex-col lg:flex-row">
                            {/* Left: Product Image */}
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

                            {/* Right: Content */}
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

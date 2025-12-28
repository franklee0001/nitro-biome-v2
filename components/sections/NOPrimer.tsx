'use client';

import { Messages } from '@/lib/i18n';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

interface NOPrimerProps {
    messages: Messages;
}

// CONSTANTS: Fixed item heights for proper stacking
const HEADLINE_ITEM_HEIGHT = 400; // px - slightly reduced for better fit
const CARD_ITEM_HEIGHT = 260; // px

// Animation constants
const BG_SCALE_START = 1.06;
const BG_SCALE_END = 1.18;
const BG_YOFFSET_START = -6;
const BG_YOFFSET_END = 6;
const CARD_DRIFT = 56;
const SCROLL_DURATION = '+=420%'; // 4.2x viewport height for 4 steps

export function NOPrimer({ messages }: NOPrimerProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const cardContainerRef = useRef<HTMLDivElement>(null);

    // Core refs for the stack-based animation
    const headlineStackRef = useRef<HTMLDivElement>(null);
    const cardStackRef = useRef<HTMLDivElement>(null);

    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const steps = messages.noPrimer.steps;
    const stepCount = steps.length;

    // Asset Loading
    useEffect(() => {
        const img = new Image();
        img.src = '/sections/forest.jpg';
        img.onload = () => {
            setImageLoaded(true);
            setTimeout(() => ScrollTrigger.refresh(), 100);
        };
        img.onerror = () => {
            setImageError(true);
        };
    }, []);

    // GSAP Animation Setup - useLayoutEffect for DOM measurements
    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add('(min-width: 1024px)', () => {
                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (reducedMotion) return;

                const section = sectionRef.current;
                const bg = bgRef.current;
                const cardContainer = cardContainerRef.current;
                const headlineStack = headlineStackRef.current;
                const cardStack = cardStackRef.current;

                if (!section || !bg || !cardContainer || !headlineStack || !cardStack) {
                    console.warn('[NOPrimer] Missing refs for animation');
                    return;
                }

                // 1. Set initial states explicitly
                gsap.set(bg, { scale: BG_SCALE_START, yPercent: BG_YOFFSET_START });
                gsap.set(cardContainer, { y: 0 });
                gsap.set(headlineStack, { y: 0 });
                gsap.set(cardStack, { y: 0 });

                // 2. Build the Master Timeline
                // Using labels for precise step timing
                const tl = gsap.timeline();

                // Calculate step boundaries (each step gets equal portion)
                const stepDuration = 1 / stepCount;

                // Add labels for each step
                for (let i = 0; i < stepCount; i++) {
                    tl.addLabel(`step${i}`, i * stepDuration);
                }
                tl.addLabel('end', 1);

                // Background: Continuous parallax and scale throughout
                tl.fromTo(bg,
                    { yPercent: BG_YOFFSET_START, scale: BG_SCALE_START },
                    { yPercent: BG_YOFFSET_END, scale: BG_SCALE_END, ease: 'none', duration: 1 },
                    0
                );

                // Card container: Gentle drift throughout
                tl.fromTo(cardContainer,
                    { y: 0 },
                    { y: CARD_DRIFT, ease: 'none', duration: 1 },
                    0
                );

                // Step transitions: Snap at each step boundary
                // Transition duration as fraction of total (snappy feel)
                const transitionDuration = 0.08; // 8% of each step = quick snap

                for (let i = 1; i < stepCount; i++) {
                    const transitionStart = i * stepDuration - transitionDuration / 2;

                    const headlineShift = -i * HEADLINE_ITEM_HEIGHT;
                    const cardShift = -i * CARD_ITEM_HEIGHT;

                    // Headline stack slides up
                    tl.to(headlineStack, {
                        y: headlineShift,
                        ease: 'power2.inOut',
                        duration: transitionDuration,
                    }, transitionStart);

                    // Card content stack slides up (synced)
                    tl.to(cardStack, {
                        y: cardShift,
                        ease: 'power2.inOut',
                        duration: transitionDuration,
                    }, transitionStart);
                }

                // 3. Create ScrollTrigger with the timeline
                ScrollTrigger.create({
                    id: 'NOPrimer',
                    trigger: section,
                    start: 'top top',
                    end: SCROLL_DURATION,
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.8,
                    anticipatePin: 1,
                    animation: tl,
                    invalidateOnRefresh: true,
                    snap: {
                        snapTo: 1 / (stepCount - 1), // Snap to each step (0, 0.33, 0.67, 1)
                        duration: { min: 0.2, max: 0.4 },
                        ease: 'power2.inOut',
                    },
                    onLeave: () => {
                        // Snap to next section when all steps complete
                        const nextSection = document.getElementById('mechanism');
                        if (nextSection) {
                            gsap.to(window, {
                                scrollTo: { y: nextSection, autoKill: false },
                                duration: 0.6,
                                ease: 'power2.inOut',
                            });
                        }
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [stepCount]);

    return (
        <section
            id="no-primer"
            ref={sectionRef}
            className="relative w-full min-h-screen bg-[#0a0a0a]"
        >
            {/* MOBILE / REDUCED MOTION LAYOUT */}
            <div className="lg:hidden motion-reduce:block relative w-full py-24 px-6 z-10">
                <div className="absolute inset-0 z-0 opacity-20">
                    {!imageError && (
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: 'url(/sections/forest.jpg)' }}
                        />
                    )}
                </div>
                <div className="relative z-10 space-y-8 max-w-xl mx-auto">
                    {steps.map((text, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10"
                        >
                            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/50 mb-3 block">
                                Step {String(i + 1).padStart(2, '0')}
                            </span>
                            <p className="text-lg text-white/90 leading-relaxed font-medium">
                                {text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* DESKTOP PINNED LAYOUT */}
            <div className="hidden lg:block motion-reduce:!hidden relative w-full h-screen">
                <div className="w-full h-full overflow-hidden relative">

                    {/* Background Layer */}
                    <div className="absolute inset-0 z-0 bg-black overflow-hidden">
                        {!imageError ? (
                            <div
                                ref={bgRef}
                                className="absolute inset-0 bg-cover bg-center origin-center will-change-transform"
                                style={{
                                    backgroundImage: 'url(/sections/forest.jpg)',
                                    opacity: imageLoaded ? 1 : 0,
                                    transition: 'opacity 1s ease-out',
                                }}
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a]" />
                        )}
                        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                    </div>

                    {/* Center Headlines Mask */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                        {/* Mask Container: Fixed height = 1 item height, offset left to avoid card overlap */}
                        <div
                            className="relative w-full max-w-2xl px-6 -translate-x-[10%] xl:-translate-x-[15%] overflow-hidden"
                            style={{ height: HEADLINE_ITEM_HEIGHT }}
                        >
                            {/* Stack Container: Total height = stepCount * item height */}
                            <div
                                ref={headlineStackRef}
                                className="flex flex-col w-full will-change-transform"
                                style={{ height: stepCount * HEADLINE_ITEM_HEIGHT }}
                            >
                                {steps.map((text, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-center px-4"
                                        style={{ height: HEADLINE_ITEM_HEIGHT, flexShrink: 0 }}
                                    >
                                        <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white text-center leading-tight drop-shadow-2xl">
                                            {text}
                                        </h2>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right-side Glass Card Mask */}
                    <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-8 xl:pr-16 pointer-events-none">
                        <div
                            ref={cardContainerRef}
                            className="relative w-[320px] xl:w-[340px] will-change-transform"
                        >
                            <div
                                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/30 backdrop-blur-2xl pointer-events-auto"
                                style={{
                                    boxShadow: '0 32px 64px -16px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.05) inset',
                                }}
                            >
                                <div className="p-8 xl:p-10 relative">
                                    {/* Icon Circle */}
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/5">
                                        <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>

                                    {/* Card Content Mask: Fixed height = 1 item height */}
                                    <div
                                        className="relative overflow-hidden"
                                        style={{ height: CARD_ITEM_HEIGHT }}
                                    >
                                        {/* Stack Container */}
                                        <div
                                            ref={cardStackRef}
                                            className="flex flex-col w-full will-change-transform"
                                            style={{ height: stepCount * CARD_ITEM_HEIGHT }}
                                        >
                                            {steps.map((text, i) => (
                                                <div
                                                    key={i}
                                                    className="flex flex-col justify-start pt-2"
                                                    style={{ height: CARD_ITEM_HEIGHT, flexShrink: 0 }}
                                                >
                                                    <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 block mb-4">
                                                        Step {String(i + 1).padStart(2, '0')}
                                                    </span>
                                                    <p className="text-xl xl:text-2xl font-medium leading-relaxed text-white/95">
                                                        {text}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Decoration Progress Dots */}
                                    <div className="mt-8 flex gap-3">
                                        {steps.map((_, i) => (
                                            <div key={i} className="h-1 flex-1 rounded-full bg-white/20" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

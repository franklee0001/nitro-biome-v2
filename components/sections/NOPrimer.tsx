'use client';

import { Messages } from '@/lib/i18n';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface NOPrimerProps {
    messages: Messages;
}

// CONSTANTS: Fixed item heights for proper stacking
const HEADLINE_ITEM_HEIGHT = 450; // px
const CARD_ITEM_HEIGHT = 280; // px

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

    // GSAP Animation Setup
    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add('(min-width: 1024px)', () => {
                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (reducedMotion) return;

                // 1. Initial State
                if (bgRef.current) gsap.set(bgRef.current, { scale: 1.05, yPercent: -6 });
                if (cardContainerRef.current) gsap.set(cardContainerRef.current, { y: 0 });
                if (headlineStackRef.current) gsap.set(headlineStackRef.current, { y: 0 });
                if (cardStackRef.current) gsap.set(cardStackRef.current, { y: 0 });

                // 2. Build the Master Timeline
                const tl = gsap.timeline({ paused: true });

                // Background Parallax (Linear)
                if (bgRef.current) {
                    tl.to(bgRef.current, {
                        yPercent: 6,
                        ease: 'none',
                        duration: 1,
                    }, 0);
                }

                // Card Container Drift
                if (cardContainerRef.current) {
                    tl.to(cardContainerRef.current, {
                        y: 56,
                        ease: 'none',
                        duration: 1,
                    }, 0);
                }

                // Stack Transitions
                const stepSeg = 1 / stepCount;

                for (let i = 1; i < stepCount; i++) {
                    const targetProgress = i * stepSeg;

                    // Use pixel-based y instead of yPercent for robustness
                    const headlineShift = -i * HEADLINE_ITEM_HEIGHT;
                    const cardShift = -i * CARD_ITEM_HEIGHT;

                    // "훅훅" Punch Zoom
                    const nextScale = 1.05 + (i * 0.08);

                    if (headlineStackRef.current) {
                        tl.to(headlineStackRef.current, {
                            y: headlineShift,
                            ease: 'power2.inOut',
                            duration: 0.1,
                        }, targetProgress);
                    }

                    if (cardStackRef.current) {
                        tl.to(cardStackRef.current, {
                            y: cardShift,
                            ease: 'power2.inOut',
                            duration: 0.1,
                        }, targetProgress);
                    }

                    // Synced Background Punch Zoom
                    if (bgRef.current) {
                        tl.to(bgRef.current, {
                            scale: nextScale,
                            ease: 'power2.inOut',
                            duration: 0.1,
                        }, targetProgress);
                    }
                }

                // 3. Create ScrollTrigger
                ScrollTrigger.create({
                    id: 'NOPrimer',
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=400%',
                    pin: true,
                    pinSpacing: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                    animation: tl,
                    invalidateOnRefresh: true,
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
                    <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
                        {/* Mask Container: Fixed height = 1 item height, positioned to avoid card */}
                        <div
                            className="relative w-full max-w-3xl px-8 ml-8 xl:ml-16 overflow-hidden"
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
                                        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center leading-tight drop-shadow-2xl">
                                            {text}
                                        </h2>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right-side Glass Card Mask */}
                    <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-12 xl:pr-24 pointer-events-none">
                        <div
                            ref={cardContainerRef}
                            className="relative w-[380px] xl:w-[460px] will-change-transform"
                        >
                            <div
                                className="relative overflow-hidden rounded-[40px] border border-white/10 bg-black/30 backdrop-blur-2xl pointer-events-auto"
                                style={{
                                    boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.05) inset',
                                }}
                            >
                                <div className="p-10 xl:p-14 relative">
                                    {/* Icon Circle */}
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-8 border border-white/5">
                                        <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                                                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 block mb-6">
                                                        Step {String(i + 1).padStart(2, '0')}
                                                    </span>
                                                    <p className="text-2xl xl:text-3xl font-medium leading-relaxed text-white/95">
                                                        {text}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Decoration Progress Dots */}
                                    <div className="mt-10 flex gap-4">
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

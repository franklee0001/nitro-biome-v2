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

export function NOPrimer({ messages }: NOPrimerProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    const [isMobile, setIsMobile] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [assetStatus, setAssetStatus] = useState<{ status: number; ok: boolean } | null>(null);

    // 1. Initial environment and asset check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
        const checkMotion = () => setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

        checkMobile();
        checkMotion();

        window.addEventListener('resize', checkMobile);

        // Dev-only check for asset existence
        if (process.env.NODE_ENV === 'development') {
            fetch('/sections/forest.jpg', { method: 'HEAD' })
                .then(res => {
                    setAssetStatus({ status: res.status, ok: res.ok });
                    if (!res.ok) {
                        console.error(`[NOPrimer] Background asset missing: /sections/forest.jpg (Status: ${res.status})`);
                    }
                })
                .catch(err => console.error('[NOPrimer] Error checking asset:', err));
        }

        // Preload image
        const img = new Image();
        img.src = '/sections/forest.jpg';
        img.onload = () => {
            setImageLoaded(true);
            setTimeout(() => ScrollTrigger.refresh(), 100);
        };
        img.onerror = () => {
            setImageError(true);
        };

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 2. Main ScrollTrigger Interaction
    useEffect(() => {
        if (!sectionRef.current || !pinRef.current) return;

        const mm = gsap.matchMedia();
        const steps = messages.noPrimer.steps;
        const stepCount = steps.length;
        let currentStepIndex = 0;

        mm.add({
            // Desktop
            isDesktop: `(min-width: 1025px) and (prefers-reduced-motion: no-preference)`,
            // Mobile / Reduced Motion
            isMobileOrReduced: `(max-width: 1024px), (prefers-reduced-motion: reduce)`
        }, (context) => {
            const { isDesktop } = context.conditions as { isDesktop: boolean };

            if (isDesktop) {
                // Wrap everything in a context for easy cleanup
                const innerCtx = gsap.context(() => {
                    if (process.env.NODE_ENV === 'development') {
                        console.log('[NOPrimer] Initializing Desktop Scroll interaction');
                    }

                    // Initial State: First line visible, others hidden below
                    lineRefs.current.forEach((line, i) => {
                        if (!line) return;
                        gsap.set(line, {
                            yPercent: i === 0 ? 0 : 110,
                            autoAlpha: 1
                        });
                    });

                    // Background initial state
                    if (bgRef.current) {
                        gsap.set(bgRef.current, { scale: 1.08, yPercent: -3 });
                    }

                    // Main ScrollTrigger
                    ScrollTrigger.create({
                        trigger: sectionRef.current,
                        pin: pinRef.current,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 1.2,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            // 2A. Background Zoom & Parallax
                            if (bgRef.current) {
                                const prog = self.progress;
                                const scale = 1.08 + (prog * 0.06); // 1.08 to 1.14
                                const yPercent = -3 + (prog * 6);   // -3 to 3
                                gsap.set(bgRef.current, { scale, yPercent });
                            }

                            // 2B. Step index mapping
                            // Math.floor(progress * count) ensures even segments
                            // Using 0.999 to avoid index out of bounds at progress = 1
                            const newIndex = Math.floor(self.progress * stepCount * 0.999);

                            if (newIndex !== currentStepIndex) {
                                if (process.env.NODE_ENV === 'development') {
                                    console.log(`[NOPrimer] Step change: ${currentStepIndex} -> ${newIndex}`);
                                }

                                const prevLine = lineRefs.current[currentStepIndex];
                                const nextLine = lineRefs.current[newIndex];
                                const isForward = newIndex > currentStepIndex;

                                if (prevLine && nextLine) {
                                    // Kill active tweens to prevent jumpy behavior on fast scroll
                                    gsap.killTweensOf([prevLine, nextLine]);

                                    // Animate previous OUT
                                    gsap.to(prevLine, {
                                        yPercent: isForward ? -110 : 110,
                                        duration: 0.6,
                                        ease: 'power2.inOut',
                                        overwrite: "auto"
                                    });

                                    // Animate next IN
                                    gsap.fromTo(nextLine,
                                        { yPercent: isForward ? 110 : -110 },
                                        {
                                            yPercent: 0,
                                            duration: 0.6,
                                            ease: 'power2.out',
                                            overwrite: "auto"
                                        }
                                    );
                                }
                                currentStepIndex = newIndex;
                            }
                        }
                    });
                }, sectionRef);

                return () => innerCtx.revert();
            }
        });

        // Final refresh once everything is mounted
        ScrollTrigger.refresh();

        return () => {
            mm.revert();
            ScrollTrigger.refresh();
        };
    }, [messages.noPrimer.steps]);

    // Handle Mobile / Reduced Motion View separately
    if (isMobile || reducedMotion) {
        return (
            <div id="no-primer" className="relative w-full py-24 px-8 bg-[#fdfaf6]">
                <div className="absolute inset-0 z-0 opacity-10">
                    {!imageError && (
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: 'url(/sections/forest.jpg)' }}
                        />
                    )}
                </div>
                <div className="relative z-10 max-w-xl mx-auto space-y-16 text-center">
                    {messages.noPrimer.steps.map((text: string, i: number) => (
                        <div key={i} className="space-y-4">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-primary)]">Step 0{i + 1}</span>
                            <p className="text-display-md text-[var(--color-text-primary)] leading-tight">
                                {text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Default Desktop View
    return (
        <section
            ref={sectionRef}
            id="no-primer"
            className="relative w-full bg-[#0a0a0a]"
            style={{ height: '400vh' }}
        >
            <div
                ref={pinRef}
                className="relative w-full h-screen overflow-hidden"
            >
                {/* Background Layer */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                    {!imageError ? (
                        <div
                            ref={bgRef}
                            className="absolute inset-0 bg-cover bg-center origin-center transition-opacity duration-1000"
                            style={{
                                backgroundImage: 'url(/sections/forest.jpg)',
                                opacity: imageLoaded ? 1 : 0,
                                filter: 'brightness(1.12) contrast(1.02)'
                            }}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#fdfaf6] to-[#f5f0e8] opacity-20" />
                    )}

                    {/* Premium Overlays */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.25)_100%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                </div>

                {/* Content Layer - CENTERED */}
                <div className="absolute inset-0 flex items-center justify-center px-16 lg:px-24 z-10">
                    <div className="max-w-4xl w-full relative h-[400px] flex items-center justify-center text-center">
                        {messages.noPrimer.steps.map((text: string, i: number) => (
                            <div
                                key={i}
                                className="absolute inset-0 flex items-center justify-center overflow-hidden leading-tight p-4 pointer-events-none"
                            >
                                <p
                                    ref={(el) => { lineRefs.current[i] = el; }}
                                    className="text-display-lg lg:text-[clamp(2rem,4.5vw,4rem)] text-white font-medium tracking-tight will-change-transform"
                                >
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dev-only asset warning badge */}
                {process.env.NODE_ENV === 'development' && assetStatus && !assetStatus.ok && (
                    <div className="fixed top-24 left-8 z-[9999] bg-red-600 text-white p-4 rounded-lg shadow-2xl border-2 border-white animate-pulse">
                        <p className="font-bold mb-1">⚠️ ASSET 404: /sections/forest.jpg</p>
                        <p className="text-sm opacity-90 font-mono">public/sections/forest.jpg</p>
                    </div>
                )}
            </div>
        </section>
    );
}

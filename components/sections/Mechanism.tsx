'use client';

import { useRef, useEffect } from 'react';
import { Droplets, Zap, Heart, Flame, Clock } from 'lucide-react';
import { Messages } from '@/lib/i18n';
import { Container } from '@/components/ui/Container';

interface MechanismProps {
    messages: Messages;
}

const steps = [
    { id: 'intake', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'conversion', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'vessel', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'flow', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'sustain', icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

export function Mechanism({ messages }: MechanismProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Auto-play video when in view
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => {
                            // Autoplay blocked, that's ok
                        });
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="mechanism" className="py-24 lg:py-32 bg-white">
            <Container>
                {/* Header */}
                <div className="text-center mb-16 lg:mb-20">
                    <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
                        {messages.mechanism.title}
                    </h2>
                    <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                        {messages.mechanism.subtitle}
                    </p>
                </div>

                {/* Two Column Layout: Video + Steps */}
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Video Column */}
                    <div className="order-2 lg:order-1">
                        <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl border border-neutral-100">
                            {/* Video */}
                            <video
                                ref={videoRef}
                                src="/mechanism/blood-flow.mp4"
                                muted
                                loop
                                playsInline
                                className="w-full h-auto aspect-square object-cover"
                            />

                            {/* Caption */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/80 to-transparent">
                                <p className="text-xs text-neutral-500 text-center">
                                    Blood flow visualization
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Steps Column */}
                    <div className="order-1 lg:order-2">
                        <div className="grid gap-4">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const sceneData = messages.mechanism.scenes[step.id as keyof typeof messages.mechanism.scenes];

                                return (
                                    <div
                                        key={step.id}
                                        className="flex items-start gap-4 p-4 lg:p-5 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-100/50 transition-all duration-300"
                                    >
                                        {/* Step Number + Icon */}
                                        <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                                            <span className="text-[10px] font-bold text-neutral-300">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center`}>
                                                <Icon size={20} className={step.color} />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-semibold text-neutral-900 mb-0.5">
                                                {sceneData?.title}
                                            </h3>
                                            <p className="text-sm text-neutral-500 leading-relaxed">
                                                {sceneData?.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

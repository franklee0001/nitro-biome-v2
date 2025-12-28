'use client';

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

                {/* Steps Grid */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-4 lg:gap-6">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const sceneData = messages.mechanism.scenes[step.id as keyof typeof messages.mechanism.scenes];

                            return (
                                <div
                                    key={step.id}
                                    className="flex items-start gap-4 lg:gap-6 p-6 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-colors"
                                >
                                    {/* Step Number + Icon */}
                                    <div className="flex-shrink-0 flex flex-col items-center gap-2">
                                        <span className="text-xs font-bold text-neutral-300">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center`}>
                                            <Icon size={24} className={step.color} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-neutral-900 mb-1">
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
            </Container>
        </section>
    );
}

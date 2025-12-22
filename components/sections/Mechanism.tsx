'use client';

import { useState } from 'react';
import Lottie from 'lottie-react';
import { Messages } from '@/lib/i18n';
import { Container } from '@/components/ui/Container';
import { useMechanismScroll } from '@/hooks/useMechanismScroll';
import { mechanismScenes } from '@/data/mechanism-scenes';

// Simple placeholder Lottie data
const placeholderLottieData = {
    v: '5.5.7',
    fr: 30,
    ip: 0,
    op: 150,
    w: 500,
    h: 500,
    nm: 'Mechanism Placeholder',
    ddd: 0,
    assets: [],
    layers: [
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: 'Circle',
            sr: 1,
            ks: {
                o: { a: 0, k: 100 },
                r: { a: 1, k: [{ t: 0, s: [0] }, { t: 150, s: [360] }] },
                p: { a: 0, k: [250, 250, 0] },
                a: { a: 0, k: [0, 0, 0] },
                s: { a: 0, k: [100, 100, 100] },
            },
            ao: 0,
            shapes: [
                {
                    ty: 'gr',
                    it: [
                        {
                            d: 1,
                            ty: 'el',
                            s: { a: 0, k: [200, 200] },
                            p: { a: 0, k: [0, 0] },
                        },
                        {
                            ty: 'st',
                            c: { a: 0, k: [0.24, 0.36, 0.14, 1] },
                            o: { a: 0, k: 100 },
                            w: { a: 0, k: 4 },
                        },
                        {
                            ty: 'fl',
                            c: { a: 0, k: [0.24, 0.36, 0.14, 0.1] },
                            o: { a: 0, k: 100 },
                        },
                    ],
                },
            ],
            ip: 0,
            op: 150,
            st: 0,
        },
    ],
};

interface MechanismProps {
    messages: Messages;
}

export function Mechanism({ messages }: MechanismProps) {
    const [currentScene, setCurrentScene] = useState(0);

    const { containerRef, lottieRef } = useMechanismScroll({
        sceneCount: mechanismScenes.length,
        onSceneChange: setCurrentScene,
    });

    const currentSceneData = mechanismScenes[currentScene];
    const sceneMessages = messages.mechanism.scenes[currentSceneData.id as keyof typeof messages.mechanism.scenes];

    return (
        <section
            id="mechanism"
            className="section bg-[var(--bg-secondary)]"
            ref={containerRef}
        >
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
                        {messages.mechanism.title}
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)]">
                        {messages.mechanism.subtitle}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Lottie Canvas */}
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md aspect-square">
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={placeholderLottieData}
                                loop={false}
                                autoplay={false}
                            />
                            {/* TODO: Replace with final Lottie in Phase 2 */}
                            <p className="text-center text-sm text-[var(--text-muted)] mt-4">
                                Lottie Placeholder
                            </p>
                        </div>
                    </div>

                    {/* Scene Text */}
                    <div className="space-y-4">
                        <div
                            className="transition-opacity duration-500"
                            key={currentScene}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-sm font-medium text-[var(--green-primary)] bg-[var(--green-primary)]/10 px-3 py-1 rounded-full">
                                    {currentScene + 1} / {mechanismScenes.length}
                                </span>
                                <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                                    {sceneMessages.title}
                                </h3>
                            </div>

                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                                {sceneMessages.description}
                            </p>
                        </div>

                        {/* Scene indicators */}
                        <div className="flex gap-2 pt-6">
                            {mechanismScenes.map((scene, index) => (
                                <div
                                    key={scene.id}
                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${index <= currentScene
                                            ? 'bg-[var(--green-primary)]'
                                            : 'bg-[var(--bg-primary)]'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

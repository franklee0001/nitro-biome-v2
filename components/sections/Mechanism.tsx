'use client';

import { Messages } from '@/lib/i18n';
import { Container } from '@/components/ui/Container';
import { mechanismScenes } from '@/data/mechanism-scenes';
import { useMechanismScroll } from '@/hooks/useMechanismScroll';
import { MechanismScene } from './mechanism/MechanismScene';

interface MechanismProps {
    messages: Messages;
}

export function Mechanism({ messages }: MechanismProps) {
    const { containerRef, activeSceneIndex } = useMechanismScroll();

    return (
        <section
            id="mechanism"
            ref={containerRef}
            className="relative w-full bg-[var(--color-bg-secondary)] overflow-hidden"
        >
            <div className="h-screen w-full flex flex-col justify-center py-20 lg:py-0 relative">
                <Container>
                    <div className="text-center mb-8 lg:mb-12 absolute top-12 left-0 right-0 z-20 pointer-events-none">
                        <h2 className="text-display-md text-[var(--color-text-primary)] mb-4">
                            {messages.mechanism.title}
                        </h2>
                        <p className="text-body-lg text-[var(--color-text-secondary)]">
                            {messages.mechanism.subtitle}
                        </p>
                    </div>

                    <div className="relative w-full h-[60vh] lg:h-[70vh]">
                        {mechanismScenes.map((scene, index) => (
                            <MechanismScene
                                key={scene.id}
                                scene={scene}
                                isActive={index === activeSceneIndex}
                                messages={messages}
                            />
                        ))}
                    </div>

                    {/* Progress Indicator */}
                    <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-20">
                        {mechanismScenes.map((scene, index) => (
                            <div
                                key={`dot-${scene.id}`}
                                className={`h-2 rounded-full transition-all duration-300 ${index === activeSceneIndex
                                        ? 'w-8 bg-[var(--color-green-primary)]'
                                        : 'w-2 bg-[var(--color-green-primary)]/20'
                                    }`}
                            />
                        ))}
                    </div>
                </Container>
            </div>
        </section>
    );
}

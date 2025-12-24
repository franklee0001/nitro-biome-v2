'use client';

import Image from 'next/image';
import { type MechanismScene as MechanismSceneType } from '@/data/mechanism-scenes';
import { Messages } from '@/lib/i18n';

interface MechanismSceneProps {
    scene: MechanismSceneType;
    isActive: boolean;
    messages: Messages;
}

export function MechanismScene({ scene, isActive, messages }: MechanismSceneProps) {
    // We access the nested keys dynamically
    const title = messages.mechanism.scenes[scene.id as keyof typeof messages.mechanism.scenes]?.title;
    const description = messages.mechanism.scenes[scene.id as keyof typeof messages.mechanism.scenes]?.description;

    return (
        <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ease-[var(--ease-apple)] ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
        >
            {/* Scene Visual */}
            <div className="relative w-full max-w-2xl aspect-[4/3] mb-8 lg:mb-12">
                <Image
                    src={scene.svgPath}
                    alt={title || ''}
                    fill
                    className="object-contain"
                    priority={scene.order === 1}
                />
            </div>

            {/* Scene Text */}
            <div className="text-center max-w-xl px-4 space-y-4">
                <h3 className="text-display-md text-[var(--color-green-deep)] transition-transform duration-700 delay-100 transform translate-y-0">
                    {isActive ? title : ''}
                </h3>
                <p className="text-body-lg text-[var(--color-text-secondary)] transition-transform duration-700 delay-200 transform translate-y-0">
                    {isActive ? description : ''}
                </p>
            </div>
        </div>
    );
}

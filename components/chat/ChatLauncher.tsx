'use client';

import { MessageCircle, X } from 'lucide-react';

interface ChatLauncherProps {
    isOpen: boolean;
    onClick: () => void;
}

export function ChatLauncher({ isOpen, onClick }: ChatLauncherProps) {
    return (
        <button
            onClick={onClick}
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
            aria-expanded={isOpen}
            className={`
                fixed z-[60]
                bottom-6 right-6
                md:bottom-8 md:right-8
                w-14 h-14
                md:w-16 md:h-16
                rounded-full
                flex items-center justify-center
                transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]

                /* Liquid Glass styling */
                backdrop-blur-xl backdrop-saturate-150
                bg-white/20
                border border-white/30
                shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]

                /* Hover effects */
                hover:bg-white/30
                hover:border-white/40
                hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.5),0_0_20px_rgba(16,185,129,0.15)]
                hover:scale-105

                /* Active state */
                active:scale-95
                active:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2)]

                /* Focus state */
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500/50
                focus-visible:ring-offset-2
                focus-visible:ring-offset-transparent

                /* Safe area for mobile */
                pb-[env(safe-area-inset-bottom,0px)]

                /* Dim when panel is open */
                ${isOpen ? 'opacity-70 hover:opacity-100' : ''}
            `}
        >
            {/* Inner highlight */}
            <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                aria-hidden="true"
            />

            {/* Icon with transition */}
            <span className="relative z-10 text-neutral-700 transition-transform duration-300">
                {isOpen ? (
                    <X size={24} className="md:w-7 md:h-7" />
                ) : (
                    <MessageCircle size={24} className="md:w-7 md:h-7" />
                )}
            </span>

            {/* Subtle pulse animation when closed */}
            {!isOpen && (
                <span
                    className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping"
                    style={{ animationDuration: '3s' }}
                    aria-hidden="true"
                />
            )}
        </button>
    );
}

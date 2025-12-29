'use client';

import { X } from 'lucide-react';

interface ChatHeaderProps {
    onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
    return (
        <div className="relative z-10 flex-shrink-0 px-5 py-4 border-b border-black/5">
            <div className="flex items-center justify-between">
                {/* Title & Status */}
                <div className="flex items-center gap-3">
                    {/* Avatar/Logo */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md">
                        <span className="text-white text-sm font-bold">NB</span>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-neutral-800">
                            NitroBiome Assistant
                        </h2>
                        <div className="flex items-center gap-1.5">
                            {/* Online indicator */}
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-xs text-neutral-500">Online</span>
                        </div>
                    </div>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close chat"
                    className="
                        w-8 h-8
                        rounded-full
                        flex items-center justify-center
                        text-neutral-400
                        hover:text-neutral-600
                        hover:bg-black/5
                        transition-colors duration-200
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-emerald-500/50
                    "
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
}

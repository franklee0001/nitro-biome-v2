'use client';

import { useRef, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import type { ChatMessage, QuickReply } from '@/lib/chat/types';

interface ChatPanelProps {
    isOpen: boolean;
    messages: ChatMessage[];
    isTyping: boolean;
    quickReplies: QuickReply[];
    onClose: () => void;
    onSendMessage: (message: string) => void;
    onQuickReply: (reply: QuickReply) => void;
}

export function ChatPanel({
    isOpen,
    messages,
    isTyping,
    quickReplies,
    onClose,
    onSendMessage,
    onQuickReply,
}: ChatPanelProps) {
    const panelRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when panel is open on mobile
    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';

            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    return (
        <>
            {/* Backdrop for mobile */}
            <div
                className={`
                    fixed inset-0 z-[55]
                    bg-black/20 backdrop-blur-sm
                    md:hidden
                    transition-opacity duration-300
                    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Chat Panel */}
            <div
                ref={panelRef}
                role="dialog"
                aria-label="Chat with NitroBiome Assistant"
                aria-modal="true"
                className={`
                    fixed z-[56]

                    /* Mobile: near full screen */
                    inset-x-4 bottom-24 top-auto
                    h-[70vh] max-h-[600px]

                    /* Desktop: fixed size bottom-right */
                    md:inset-auto
                    md:bottom-28 md:right-8
                    md:w-[400px] md:h-[560px]

                    /* Liquid Glass Panel */
                    rounded-3xl
                    overflow-hidden
                    backdrop-blur-2xl backdrop-saturate-150
                    bg-white/70
                    border border-white/40
                    shadow-[0_24px_80px_-20px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.6)]
                    ring-1 ring-black/5

                    /* Animation */
                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${isOpen
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                    }

                    /* Flex layout */
                    flex flex-col
                `}
            >
                {/* Top edge shine */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    aria-hidden="true"
                />

                {/* Inner gradient overlay for readability */}
                <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/20"
                    aria-hidden="true"
                />

                {/* Header */}
                <ChatHeader onClose={onClose} />

                {/* Messages */}
                <ChatMessages
                    messages={messages}
                    isTyping={isTyping}
                    quickReplies={quickReplies}
                    onQuickReply={onQuickReply}
                />

                {/* Input */}
                <ChatInput onSendMessage={onSendMessage} disabled={isTyping} />
            </div>
        </>
    );
}

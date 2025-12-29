'use client';

import { useRef, useEffect } from 'react';
import type { ChatMessage, QuickReply } from '@/lib/chat/types';

interface ChatMessagesProps {
    messages: ChatMessage[];
    isTyping: boolean;
    quickReplies: QuickReply[];
    onQuickReply: (reply: QuickReply) => void;
}

// Format timestamp to readable time
function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Typing indicator component
function TypingIndicator() {
    return (
        <div className="flex items-start gap-2 mb-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">NB</span>
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/60 border border-black/5 shadow-sm">
                <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    );
}

// Message bubble component
function MessageBubble({ message }: { message: ChatMessage }) {
    const isUser = message.role === 'user';

    return (
        <div className={`flex items-end gap-2 mb-3 ${isUser ? 'flex-row-reverse' : ''}`}>
            {/* Avatar for assistant */}
            {!isUser && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">NB</span>
                </div>
            )}

            <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
                {/* Message bubble */}
                <div
                    className={`
                        px-4 py-2.5
                        text-sm leading-relaxed
                        whitespace-pre-wrap
                        ${isUser
                            ? 'bg-emerald-600 text-white rounded-2xl rounded-br-md shadow-md'
                            : 'bg-white/60 text-neutral-800 rounded-2xl rounded-bl-md border border-black/5 shadow-sm'
                        }
                    `}
                >
                    {message.content}
                </div>

                {/* Timestamp */}
                <div className={`mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
                    <span className="text-[10px] text-neutral-400">
                        {formatTime(message.timestamp)}
                    </span>
                </div>
            </div>
        </div>
    );
}

// Quick reply chips
function QuickReplyChips({
    replies,
    onSelect,
}: {
    replies: QuickReply[];
    onSelect: (reply: QuickReply) => void;
}) {
    if (replies.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-2 mb-3 pl-9">
            {replies.map(reply => (
                <button
                    key={reply.id}
                    onClick={() => onSelect(reply)}
                    className="
                        px-3 py-1.5
                        text-xs font-medium
                        text-emerald-700
                        bg-emerald-50/80
                        border border-emerald-200/60
                        rounded-full
                        hover:bg-emerald-100/80
                        hover:border-emerald-300/60
                        transition-colors duration-200
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-emerald-500/50
                    "
                >
                    {reply.label}
                </button>
            ))}
        </div>
    );
}

export function ChatMessages({
    messages,
    isTyping,
    quickReplies,
    onQuickReply,
}: ChatMessagesProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    return (
        <div
            ref={scrollRef}
            className="
                relative z-10
                flex-1
                overflow-y-auto
                px-4 py-4
                scroll-smooth
                overscroll-contain
                /* iOS-like momentum scrolling */
                [-webkit-overflow-scrolling:touch]
            "
        >
            {/* Messages */}
            {messages.map(message => (
                <MessageBubble key={message.id} message={message} />
            ))}

            {/* Quick replies (shown after first assistant message) */}
            {quickReplies.length > 0 && messages.length === 1 && (
                <QuickReplyChips replies={quickReplies} onSelect={onQuickReply} />
            )}

            {/* Typing indicator */}
            {isTyping && <TypingIndicator />}

            {/* Scroll anchor */}
            <div ref={bottomRef} aria-hidden="true" />
        </div>
    );
}

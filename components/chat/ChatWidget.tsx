'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChatLauncher } from './ChatLauncher';
import { ChatPanel } from './ChatPanel';
import { createMockAdapter, welcomeMessage, quickReplies } from '@/lib/chat/adapter';
import type { ChatMessage, QuickReply } from '@/lib/chat/types';

// Create adapter instance (swap this for Vertex AI later)
const chatAdapter = createMockAdapter();

// Generate unique message ID
function generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showQuickReplies, setShowQuickReplies] = useState(true);

    // Initialize with welcome message
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: generateId(),
                    role: 'assistant',
                    content: welcomeMessage,
                    timestamp: new Date(),
                },
            ]);
        }
    }, [messages.length]);

    // Load messages from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('nitrobiome_chat_messages');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // Convert timestamp strings back to Date objects
                    const restored = parsed.map((msg: ChatMessage) => ({
                        ...msg,
                        timestamp: new Date(msg.timestamp),
                    }));
                    setMessages(restored);
                    // Hide quick replies if there are user messages
                    if (restored.some((m: ChatMessage) => m.role === 'user')) {
                        setShowQuickReplies(false);
                    }
                } catch {
                    // Invalid data, start fresh
                }
            }
        }
    }, []);

    // Save messages to localStorage when they change
    useEffect(() => {
        if (typeof window !== 'undefined' && messages.length > 0) {
            localStorage.setItem('nitrobiome_chat_messages', JSON.stringify(messages));
        }
    }, [messages]);

    const handleToggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleSendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return;

        // Hide quick replies after first user message
        setShowQuickReplies(false);

        // Add user message
        const userMessage: ChatMessage = {
            id: generateId(),
            role: 'user',
            content: content.trim(),
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);

        // Show typing indicator
        setIsTyping(true);

        try {
            // Get response from adapter
            const reply = await chatAdapter.sendMessage(content);

            // Add assistant message
            const assistantMessage: ChatMessage = {
                id: generateId(),
                role: 'assistant',
                content: reply,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch {
            // Handle error gracefully
            const errorMessage: ChatMessage = {
                id: generateId(),
                role: 'assistant',
                content: "I'm sorry, I encountered an issue. Please try again or use the contact form for assistance.",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    }, []);

    const handleQuickReply = useCallback((reply: QuickReply) => {
        handleSendMessage(reply.message);
    }, [handleSendMessage]);

    return (
        <>
            {/* Chat Panel (shown when open) */}
            <ChatPanel
                isOpen={isOpen}
                messages={messages}
                isTyping={isTyping}
                quickReplies={showQuickReplies ? quickReplies : []}
                onClose={handleClose}
                onSendMessage={handleSendMessage}
                onQuickReply={handleQuickReply}
            />

            {/* Launcher Button (always visible, but dimmed when panel is open) */}
            <ChatLauncher
                isOpen={isOpen}
                onClick={handleToggle}
            />
        </>
    );
}

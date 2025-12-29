'use client';

import { useState, useRef, useCallback, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = useCallback(() => {
        if (value.trim() && !disabled) {
            onSendMessage(value.trim());
            setValue('');

            // Reset textarea height
            if (inputRef.current) {
                inputRef.current.style.height = 'auto';
            }
        }
    }, [value, disabled, onSendMessage]);

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
        // Submit on Enter (but not Shift+Enter)
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }, [handleSubmit]);

    const handleInput = useCallback(() => {
        // Auto-resize textarea
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
        }
    }, []);

    return (
        <div className="relative z-10 flex-shrink-0 px-4 py-3 border-t border-black/5">
            <div className="flex items-end gap-2">
                {/* Text input */}
                <div className="flex-1 relative">
                    <textarea
                        ref={inputRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onInput={handleInput}
                        placeholder="Type a message..."
                        disabled={disabled}
                        rows={1}
                        className="
                            w-full
                            px-4 py-2.5
                            text-sm
                            text-neutral-800
                            placeholder:text-neutral-400
                            bg-white/50
                            border border-black/10
                            rounded-2xl
                            resize-none
                            overflow-hidden
                            transition-all duration-200
                            focus:bg-white/70
                            focus:border-emerald-300
                            focus:outline-none
                            focus:ring-2
                            focus:ring-emerald-500/20
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                        style={{ maxHeight: '120px' }}
                    />
                </div>

                {/* Send button */}
                <button
                    onClick={handleSubmit}
                    disabled={disabled || !value.trim()}
                    aria-label="Send message"
                    className={`
                        flex-shrink-0
                        w-10 h-10
                        rounded-full
                        flex items-center justify-center
                        transition-all duration-200
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-emerald-500/50

                        ${value.trim() && !disabled
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg active:scale-95'
                            : 'bg-neutral-200/50 text-neutral-400 cursor-not-allowed'
                        }
                    `}
                >
                    <Send size={18} />
                </button>
            </div>

            {/* Hint text */}
            <p className="mt-2 text-[10px] text-neutral-400 text-center">
                Press Enter to send, Shift+Enter for new line
            </p>
        </div>
    );
}

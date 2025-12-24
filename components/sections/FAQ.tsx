'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Messages } from '@/lib/i18n';
import { Container } from '@/components/ui/Container';

interface FAQProps {
    messages: Messages;
}

export function FAQ({ messages }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const questions = Object.entries(messages.faq.questions);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section py-32 bg-[var(--color-bg-primary)]">
            <Container>
                <div className="text-center mb-24">
                    <h2 className="text-display-md text-[var(--color-text-primary)]">
                        {messages.faq.title}
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto border-t border-[var(--color-text-muted)]/10">
                    {questions.map(([key, qa], index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={key}
                                className="border-b border-[var(--color-text-muted)]/10"
                            >
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="w-full py-10 flex items-start justify-between text-left group focus:outline-none"
                                    aria-expanded={isOpen}
                                >
                                    <span className={`text-2xl lg:text-3xl font-medium tracking-tight transition-colors duration-500 pr-12 ${isOpen ? 'text-[var(--color-green-primary)]' : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-green-primary)]'
                                        }`}>
                                        {qa.q}
                                    </span>
                                    <div className={`mt-2 flex-shrink-0 w-8 h-8 rounded-full border border-[var(--color-text-muted)]/20 flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[var(--color-green-primary)] border-[var(--color-green-primary)] text-white rotate-180' : 'text-[var(--color-text-muted)] group-hover:border-[var(--color-green-primary)] group-hover:text-[var(--color-green-primary)]'
                                        }`}>
                                        <ChevronDown size={20} />
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-700 ease-[var(--ease-apple)] ${isOpen ? 'max-h-96 opacity-100 pb-10' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-3xl opacity-80 pl-2 border-l-2 border-[var(--color-green-primary)]/20 ml-1">
                                        {qa.a}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

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
        <section id="faq" className="section py-20 lg:py-32">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
                        {messages.faq.title}
                    </h2>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {questions.map(([key, qa], index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={key}
                                className="bg-white border border-[var(--bg-secondary)] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
                            >
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            toggleQuestion(index);
                                        }
                                    }}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[var(--green-primary)] focus:ring-inset"
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-semibold text-[var(--text-primary)] pr-4">
                                        {qa.q}
                                    </span>
                                    <ChevronDown
                                        className={`flex-shrink-0 text-[var(--green-primary)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                            }`}
                                        size={20}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="px-6 pb-5">
                                        <p className="text-[var(--text-secondary)] leading-relaxed">
                                            {qa.a}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

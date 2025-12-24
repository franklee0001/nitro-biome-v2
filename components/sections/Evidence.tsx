'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Messages } from '@/lib/i18n';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { evidenceCards } from '@/data/evidence-cards';

interface EvidenceProps {
    messages: Messages;
}

export function Evidence({ messages }: EvidenceProps) {
    const [openDetails, setOpenDetails] = useState<string | null>(null);

    return (
        <section id="evidence" className="section py-[var(--spacing-section-y-mobile)] lg:py-[var(--spacing-section-y-desktop)] bg-[var(--color-bg-primary)]">
            <Container>
                <div className="text-center mb-24">
                    <h2 className="text-display-md text-[var(--color-text-primary)] mb-6">
                        {messages.evidence.title}
                    </h2>
                    <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto opacity-80">
                        {messages.evidence.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {evidenceCards.map((card) => {
                        const cardData = messages.evidence.cards[card.id as keyof typeof messages.evidence.cards];

                        return (
                            <Card key={card.id} className="h-full flex flex-col justify-between p-10 hover:shadow-2xl transition-all duration-700 border border-[var(--color-text-muted)]/5 bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm group">
                                <div className="text-center space-y-8">
                                    <h3 className="text-navigation text-[var(--color-text-muted)] tracking-widest">
                                        {cardData.title}
                                    </h3>

                                    <div className="py-4">
                                        <div className="text-6xl lg:text-7xl font-bold text-[var(--color-green-deep)] tracking-tighter mb-2 scale-100 group-hover:scale-105 transition-transform duration-700">
                                            {cardData.value}
                                        </div>
                                        <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-widest">
                                            {cardData.unit}
                                        </div>
                                    </div>

                                    <div className="h-px w-8 bg-[var(--color-green-primary)]/20 mx-auto" />

                                    <p className="text-body-lg text-[var(--color-text-primary)] leading-relaxed font-medium">
                                        {cardData.description}
                                    </p>

                                    {cardData.note && (
                                        <p className="text-sm text-[var(--color-text-muted)] italic opacity-70">
                                            {cardData.note}
                                        </p>
                                    )}
                                </div>

                                {/* Details Placeholder */}
                                <div className="mt-10 pt-8 border-t border-[var(--color-text-muted)]/10">
                                    <button
                                        onClick={() => setOpenDetails(openDetails === card.id ? null : card.id)}
                                        className="flex items-center justify-center gap-3 w-full text-sm font-bold text-[var(--color-green-primary)] hover:text-[var(--color-green-deep)] transition-colors uppercase tracking-widest mb-2"
                                    >
                                        <Plus size={14} className={`transition-transform duration-500 ${openDetails === card.id ? 'rotate-45' : ''}`} />
                                        <span>Details</span>
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-700 ease-[var(--ease-apple)] ${openDetails === card.id ? 'max-h-32 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                                        <div className="text-xs text-[var(--color-text-muted)] leading-relaxed text-center bg-[var(--color-bg-primary)]/80 p-5 rounded-2xl border border-[var(--color-text-muted)]/5">
                                            Clinical methodology and full dataset available in the technical whitepaper.
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

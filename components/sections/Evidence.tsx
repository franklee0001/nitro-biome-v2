import { Messages } from '@/lib/i18n';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { evidenceCards } from '@/data/evidence-cards';

interface EvidenceProps {
    messages: Messages;
}

export function Evidence({ messages }: EvidenceProps) {
    return (
        <section id="evidence" className="section py-20 lg:py-32">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
                        {messages.evidence.title}
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)]">
                        {messages.evidence.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {evidenceCards.map((card) => {
                        const cardData = messages.evidence.cards[card.id as keyof typeof messages.evidence.cards];

                        return (
                            <Card key={card.id}>
                                <div className="text-center space-y-4">
                                    <h3 className="text-lg font-semibold text-[var(--text-secondary)]">
                                        {cardData.title}
                                    </h3>

                                    <div className="py-4">
                                        <div className="text-4xl lg:text-5xl font-bold text-[var(--green-primary)]">
                                            {cardData.value}
                                        </div>
                                        <div className="text-sm text-[var(--text-muted)] mt-1">
                                            {cardData.unit}
                                        </div>
                                    </div>

                                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                        {cardData.description}
                                    </p>

                                    {cardData.note && (
                                        <p className="text-xs text-[var(--text-muted)]">
                                            {cardData.note}
                                        </p>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

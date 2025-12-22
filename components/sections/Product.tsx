import { Messages } from '@/lib/i18n';
import { Container } from '@/components/ui/Container';

interface ProductProps {
    messages: Messages;
}

export function Product({ messages }: ProductProps) {
    return (
        <section id="product" className="section py-20 lg:py-32 bg-[var(--bg-secondary)]">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
                        {messages.product.title}
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)]">
                        {messages.product.subtitle}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Product Image Slot */}
                    <div className="bg-white rounded-3xl aspect-square flex items-center justify-center shadow-lg">
                        <p className="text-[var(--text-muted)]">Product Image Placeholder</p>
                    </div>

                    {/* How to Use Content */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                            {messages.product.howTo}
                        </h3>

                        {/* TODO: Add actual product/usage content in Phase 2 */}
                        <div className="space-y-4 text-[var(--text-secondary)]">
                            <div className="p-6 bg-white rounded-xl">
                                <p className="font-medium mb-2">Step 1</p>
                                <p className="text-sm">Product usage step placeholder</p>
                            </div>

                            <div className="p-6 bg-white rounded-xl">
                                <p className="font-medium mb-2">Step 2</p>
                                <p className="text-sm">Product usage step placeholder</p>
                            </div>

                            <div className="p-6 bg-white rounded-xl">
                                <p className="font-medium mb-2">Step 3</p>
                                <p className="text-sm">Product usage step placeholder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

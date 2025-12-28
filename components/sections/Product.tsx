'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Messages } from '@/lib/i18n';
import { Container } from '@/components/ui/Container';

interface ProductProps {
    messages: Messages;
}

// Ingredients list for accordion
const ingredientsList = [
    'Fermented Cabbage Extract',
    'Fermented Beet Extract',
    'Fermented Spinach Extract',
    'Fermented Brown Rice',
    'Fermented Barley',
    'Natural Flavoring',
];

export function Product({ messages }: ProductProps) {
    const [ingredientsOpen, setIngredientsOpen] = useState(false);

    return (
        <section id="product" className="py-24 lg:py-32 bg-neutral-50">
            <Container>
                {/* Header */}
                <div className="text-center mb-16 lg:mb-20">
                    <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
                        {messages.product.title}
                    </h2>
                    <p className="text-lg text-neutral-500 max-w-xl mx-auto">
                        {messages.product.subtitle}
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">

                    {/* Left: Product Visual + Core Message */}
                    <div className="space-y-8">
                        {/* Product Image */}
                        <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm">
                            <img
                                src="/product/product-sample.png"
                                alt="NitroBiome Product"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Core Message */}
                        <div className="text-center lg:text-left">
                            <p className="text-xl lg:text-2xl font-medium text-neutral-800 leading-relaxed">
                                Fermented nitric oxide metabolites
                                <br />
                                <span className="text-neutral-500">for daily intake.</span>
                            </p>
                        </div>
                    </div>

                    {/* Right: Info Cards */}
                    <div className="space-y-4">

                        {/* Dosage & Format */}
                        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                            <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-4">
                                Dosage & Format
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm text-neutral-600">Per serving</span>
                                    <span className="text-sm font-semibold text-neutral-900">1 sachet</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm text-neutral-600">Mix with</span>
                                    <span className="text-sm font-semibold text-neutral-900">300ml+ water</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm text-neutral-600">Frequency</span>
                                    <span className="text-sm font-semibold text-neutral-900">1–3x daily</span>
                                </div>
                            </div>
                        </div>

                        {/* Packaging */}
                        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                            <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-4">
                                Packaging
                            </h3>
                            <div className="flex justify-between items-baseline">
                                <span className="text-sm text-neutral-600">Per box</span>
                                <span className="text-sm font-semibold text-neutral-900">30 sachets</span>
                            </div>
                        </div>

                        {/* Ingredients (Accordion) */}
                        <div className="bg-white rounded-2xl border border-neutral-200">
                            <button
                                onClick={() => setIngredientsOpen(!ingredientsOpen)}
                                className="w-full p-6 flex items-center justify-between text-left"
                            >
                                <div>
                                    <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-1">
                                        Ingredients
                                    </h3>
                                    <p className="text-sm text-neutral-600">
                                        Fermented vegetable & grain extracts
                                    </p>
                                </div>
                                <ChevronDown
                                    size={20}
                                    className={`text-neutral-400 transition-transform duration-300 ${
                                        ingredientsOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    ingredientsOpen ? 'max-h-48' : 'max-h-0'
                                }`}
                            >
                                <div className="px-6 pb-6 pt-0">
                                    <ul className="space-y-1.5">
                                        {ingredientsList.map((item, i) => (
                                            <li key={i} className="text-sm text-neutral-500 flex items-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Manufacturing */}
                        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                            <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-4">
                                Manufacturing
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm text-neutral-600">Origin</span>
                                    <span className="text-sm font-semibold text-neutral-900">Made in Korea</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm text-neutral-600">Company</span>
                                    <span className="text-sm font-semibold text-neutral-900">Hue Light Co., Ltd.</span>
                                </div>
                            </div>
                        </div>

                        {/* Precautions */}
                        <div className="bg-neutral-100 rounded-2xl border border-neutral-200 p-6">
                            <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-4">
                                Precautions
                            </h3>
                            <ul className="space-y-2 text-xs text-neutral-500 leading-relaxed">
                                <li>• Consult a physician if pregnant, nursing, or taking medication.</li>
                                <li>• Individuals with allergies should review ingredients before use.</li>
                                <li>• Excessive intake may cause headache or dizziness.</li>
                            </ul>
                            <p className="mt-4 pt-4 border-t border-neutral-200 text-xs text-neutral-400">
                                This product is not a pharmaceutical product and is not intended to diagnose, treat, cure, or prevent any disease.
                            </p>
                        </div>

                    </div>
                </div>
            </Container>
        </section>
    );
}

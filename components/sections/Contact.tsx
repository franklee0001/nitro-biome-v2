'use client';

import { useState, FormEvent } from 'react';
import { Messages } from '@/lib/i18n';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface ContactProps {
    messages: Messages;
}

export function Contact({ messages }: ContactProps) {
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: Implement actual form submission in Phase 2
        console.log('Form submitted');

        // Simulate success
        setFormStatus('success');
        setTimeout(() => setFormStatus('idle'), 3000);
    };

    const formMessages = messages.contact.form;
    const purposeOptions = formMessages.purposeOptions as Record<string, string>;

    return (
        <section id="contact" className="section py-20 lg:py-32 bg-[var(--bg-secondary)]">
            <Container>
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
                            {messages.contact.title}
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)]">
                            {messages.contact.subtitle}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg space-y-6">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                            >
                                {formMessages.name}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[var(--bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--green-primary)] transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                            >
                                {formMessages.email}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[var(--bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--green-primary)] transition-all"
                            />
                        </div>

                        {/* Purpose */}
                        <div>
                            <label
                                htmlFor="purpose"
                                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                            >
                                {formMessages.purpose}
                            </label>
                            <select
                                id="purpose"
                                name="purpose"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[var(--bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--green-primary)] transition-all"
                            >
                                <option value="personal">{purposeOptions.personal}</option>
                                <option value="b2b">{purposeOptions.b2b}</option>
                                <option value="other">{purposeOptions.other}</option>
                            </select>
                        </div>

                        {/* Message */}
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                            >
                                {formMessages.message}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[var(--bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--green-primary)] transition-all resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" size="lg" className="w-full">
                            {formMessages.submit}
                        </Button>

                        {/* Status Messages */}
                        {formStatus === 'success' && (
                            <p className="text-center text-[var(--green-primary)] font-medium">
                                {formMessages.success}
                            </p>
                        )}
                        {formStatus === 'error' && (
                            <p className="text-center text-red-600 font-medium">
                                {formMessages.error}
                            </p>
                        )}
                    </form>

                    {/* Footer */}
                    <div className="text-center mt-12 text-sm text-[var(--text-muted)]">
                        {messages.footer.copyright}
                    </div>
                </div>
            </Container>
        </section>
    );
}

'use client';

import { useState, FormEvent } from 'react';
import { Messages } from '@/lib/i18n';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { InputField, SelectField, TextAreaField } from '@/components/ui/FormFields';

interface ContactProps {
    messages: Messages;
}

export function Contact({ messages }: ContactProps) {
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted');
        setFormStatus('success');
        setTimeout(() => setFormStatus('idle'), 3000);
    };

    const formMessages = messages.contact.form;
    const purposeOptions = formMessages.purposeOptions as Record<string, string>;

    return (
        <section id="contact" className="section py-32 bg-[var(--color-bg-secondary)]/30 border-t border-[var(--color-text-muted)]/5">
            <Container>
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    {/* Left Side: CTA & Content */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-display-md text-[var(--color-text-primary)] mb-6">
                                {messages.contact.title}
                            </h2>
                            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-md opacity-80 leading-relaxed">
                                {messages.contact.subtitle}
                            </p>
                        </div>

                        <div className="pt-8 border-t border-[var(--color-text-muted)]/10">
                            <div className="flex items-center gap-4 text-[var(--color-text-muted)]">
                                <div className="w-10 h-10 rounded-full bg-[var(--color-green-primary)]/10 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-[var(--color-green-primary)] animate-pulse" />
                                </div>
                                <span className="text-sm font-medium tracking-wide italic">
                                    {formMessages.trust}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form Card */}
                    <div className="relative group">
                        {/* Decorative background element */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-green-primary)]/5 to-transparent rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <form
                            onSubmit={handleSubmit}
                            className="relative bg-[var(--color-bg-primary)] rounded-[2.5rem] p-10 lg:p-14 shadow-2xl shadow-green-900/5 border border-[var(--color-text-muted)]/5 space-y-8"
                        >
                            {/* Purpose First */}
                            <SelectField
                                id="purpose"
                                label={formMessages.purpose}
                                options={purposeOptions}
                                required
                            />

                            <div className="grid sm:grid-cols-2 gap-8">
                                {/* Name */}
                                <InputField
                                    id="name"
                                    label={formMessages.name}
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                />

                                {/* Email */}
                                <InputField
                                    id="email"
                                    label={formMessages.email}
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Message */}
                            <TextAreaField
                                id="message"
                                label={formMessages.message}
                                rows={4}
                                required
                                placeholder="Tell us about your interest..."
                            />

                            {/* Submit Button */}
                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full h-16 rounded-2xl bg-[var(--color-green-deep)] hover:bg-[var(--color-green-primary)] text-white text-lg font-bold transition-all duration-500 shadow-xl shadow-green-900/10 hover:shadow-green-900/20 active:scale-[0.98]"
                                >
                                    {formMessages.submit}
                                </Button>
                            </div>

                            {/* Status Messages */}
                            <div className="h-6 text-center">
                                {formStatus === 'success' && (
                                    <p className="text-[var(--color-green-primary)] font-bold animate-fade-in">
                                        {formMessages.success}
                                    </p>
                                )}
                                {formStatus === 'error' && (
                                    <p className="text-red-500 font-bold animate-fade-in">
                                        {formMessages.error}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    );
}

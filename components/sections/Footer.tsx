'use client';

import { Messages } from '@/lib/i18n';
import { Container } from '@/components/ui/Container';

interface FooterProps {
    messages: Messages;
}

export function Footer({ messages }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#050505] border-t border-white/5">
            {/* Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-green-primary)]/3 to-transparent pointer-events-none" />

            <Container>
                <div className="relative py-16 lg:py-20">
                    {/* Top Section: Logo + Links */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16">
                        {/* Brand */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-green-primary)] to-[var(--color-green-deep)] flex items-center justify-center shadow-lg shadow-green-900/30">
                                    <span className="text-white font-black text-lg">N</span>
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">
                                    NitroBiome
                                </span>
                            </div>
                            <p className="text-sm text-white/40 max-w-xs leading-relaxed">
                                발효 기반 대사물과 나노버블 전달로 빠른 NO 활성 흐름을 설계합니다.
                            </p>
                        </div>

                        {/* Navigation Links */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16">
                            {/* Product */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-4">
                                    Product
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a href="#mechanism" className="text-sm text-white/60 hover:text-white transition-colors">
                                            {messages.nav.mechanism}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#evidence" className="text-sm text-white/60 hover:text-white transition-colors">
                                            {messages.nav.evidence}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#product" className="text-sm text-white/60 hover:text-white transition-colors">
                                            {messages.nav.product}
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-4">
                                    Support
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a href="#faq" className="text-sm text-white/60 hover:text-white transition-colors">
                                            {messages.nav.faq}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#contact" className="text-sm text-white/60 hover:text-white transition-colors">
                                            {messages.nav.contact}
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Legal (Placeholder) */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-4">
                                    Legal
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                                            Terms of Service
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Bottom Section: Copyright */}
                    <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <p className="text-xs text-white/30 font-medium tracking-widest uppercase">
                            © {currentYear} NitroBiome. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            {/* Social Icons Placeholder */}
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                aria-label="Instagram"
                            >
                                <svg className="w-4 h-4 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-4 h-4 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { sections } from '@/config/navigation';
import { Messages } from '@/lib/i18n';
import { LanguageToggle } from './LanguageToggle';
import { Navigation } from './Navigation';
import { GlassButton } from '@/components/ui/LiquidGlass';
import { useActiveSection } from '@/hooks/useActiveSection';

interface HeaderProps {
    messages: Messages;
}

export function Header({ messages }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const sectionIds = sections.map((s) => s.id);
    const activeSection = useActiveSection(sectionIds);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mobileMenuOpen]);

    const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className={`
                fixed top-0 left-0 right-0 z-50
                transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                ${isScrolled
                    ? 'py-3 lg:py-4'
                    : 'py-5 lg:py-8'
                }
            `}
        >
            {/* Glass background layer */}
            <div
                className={`
                    absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                    ${isScrolled
                        ? 'backdrop-blur-xl backdrop-saturate-150 bg-white/70 border-b border-black/8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)]'
                        : 'backdrop-blur-md bg-white/30 border-b border-transparent'
                    }
                `}
            >
                {/* Top edge highlight */}
                <div
                    className={`
                        absolute inset-x-0 top-0 h-px
                        bg-gradient-to-r from-transparent via-white/50 to-transparent
                        transition-opacity duration-500
                        ${isScrolled ? 'opacity-100' : 'opacity-0'}
                    `}
                />
                {/* Bottom subtle glow when scrolled */}
                <div
                    className={`
                        absolute inset-x-0 bottom-0 h-px
                        bg-gradient-to-r from-transparent via-black/5 to-transparent
                        transition-opacity duration-500
                        ${isScrolled ? 'opacity-100' : 'opacity-0'}
                    `}
                />
            </div>

            {/* Content */}
            <div className="container-custom relative z-10">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="#hero"
                        className={`
                            text-2xl font-bold tracking-tight
                            transition-colors duration-300
                            ${isScrolled
                                ? 'text-[var(--color-green-deep)]'
                                : 'text-[var(--color-green-deep)]'
                            }
                        `}
                    >
                        NitroBiome
                    </Link>

                    {/* Desktop Navigation */}
                    <Navigation
                        messages={messages}
                        activeSection={activeSection}
                    />

                    {/* Desktop Right Side */}
                    <div className="hidden lg:flex items-center gap-5">
                        <LanguageToggle />
                        <GlassButton
                            size="sm"
                            variant="solid"
                            onClick={handleContactClick}
                        >
                            {messages.header.cta}
                        </GlassButton>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden items-center gap-4">
                        <LanguageToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`
                                p-2.5 rounded-full
                                backdrop-blur-md
                                transition-all duration-300
                                ${isScrolled
                                    ? 'bg-black/5 hover:bg-black/10 text-neutral-800'
                                    : 'bg-white/20 hover:bg-white/30 text-neutral-800'
                                }
                            `}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`
                        lg:hidden fixed inset-x-0 top-[64px] bottom-0 z-40
                        backdrop-blur-2xl bg-white/90
                        transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                        ${mobileMenuOpen
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-4 pointer-events-none'
                        }
                    `}
                >
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent pointer-events-none" />

                    <div className="container-custom pt-8 flex flex-col items-center gap-8 relative z-10">
                        <Navigation
                            messages={messages}
                            activeSection={activeSection}
                            mobile
                            onNavClick={() => setMobileMenuOpen(false)}
                        />
                        <GlassButton
                            size="lg"
                            variant="solid"
                            onClick={(e) => {
                                handleContactClick(e);
                                setMobileMenuOpen(false);
                            }}
                            className="w-full max-w-xs"
                        >
                            {messages.header.cta}
                        </GlassButton>
                    </div>
                </div>
            </div>
        </header>
    );
}

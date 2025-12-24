'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { sections } from '@/config/navigation';
import { Messages } from '@/lib/i18n';
import { LanguageToggle } from './LanguageToggle';
import { Navigation } from './Navigation';
import { Button } from '@/components/ui/Button';
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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mobileMenuOpen]);

    // Height calculation:
    // Desktop: Initial 112px (7rem) -> Scrolled 80px (5rem)
    // Mobile: Initial 80px (5rem) -> Scrolled 64px (4rem)
    const headerHeightClass = isScrolled
        ? 'py-3 lg:py-4'
        : 'py-5 lg:py-8';

    const headerBgClass = isScrolled
        ? 'bg-[var(--color-bg-primary)]/80 backdrop-blur-2xl shadow-sm border-b border-[var(--color-text-muted)]/5'
        : 'bg-transparent';

    const headerClassName = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[var(--ease-apple)] ${headerHeightClass} ${headerBgClass}`;

    const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={headerClassName}>
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="#hero" className="text-2xl font-bold text-[var(--color-green-deep)] tracking-tight">
                        NitroBiome
                    </Link>

                    {/* Desktop Navigation */}
                    <Navigation
                        messages={messages}
                        activeSection={activeSection}
                    />

                    {/* Desktop Right Side */}
                    <div className="hidden lg:flex items-center gap-6">
                        <LanguageToggle />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleContactClick}
                            className="bg-[var(--color-green-deep)] text-[var(--color-bg-primary)] hover:bg-[var(--color-green-primary)] transition-colors duration-300"
                        >
                            {messages.header.cta}
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden items-center gap-4">
                        <LanguageToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-[var(--color-text-primary)] p-2 hover:bg-black/5 rounded-full transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`lg:hidden fixed inset-0 z-40 bg-[var(--color-bg-primary)] transition-transform duration-500 ease-[var(--ease-apple)] ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    style={{ top: 'var(--header-height)' }}
                >
                    <div className="container-custom pt-8 flex flex-col items-center gap-8">
                        <Navigation
                            messages={messages}
                            activeSection={activeSection}
                            mobile
                            onNavClick={() => setMobileMenuOpen(false)}
                        />
                        <Button
                            variant="ghost"
                            size="md"
                            onClick={(e) => {
                                handleContactClick(e);
                                setMobileMenuOpen(false);
                            }}
                            className="w-full max-w-xs bg-[var(--color-green-deep)] text-[var(--color-bg-primary)]"
                        >
                            {messages.header.cta}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

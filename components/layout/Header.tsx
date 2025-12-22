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
            setIsScrolled(window.scrollY > 50);
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

    const headerClassName = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-[var(--bg-primary)]/95 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
        }`;

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
                    <Link href="#hero" className="text-2xl font-bold text-[var(--green-deep)]">
                        NitroBiome
                    </Link>

                    {/* Desktop Navigation */}
                    <Navigation
                        messages={messages}
                        activeSection={activeSection}
                    />

                    {/* Desktop Right Side */}
                    <div className="hidden lg:flex items-center gap-4">
                        <LanguageToggle />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleContactClick}
                        >
                            {messages.header.cta}
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden items-center gap-3">
                        <LanguageToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-[var(--text-primary)] p-2"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden pt-6 pb-4">
                        <Navigation
                            messages={messages}
                            activeSection={activeSection}
                            mobile
                            onNavClick={() => setMobileMenuOpen(false)}
                        />
                        <div className="mt-6 flex justify-center">
                            <Button
                                variant="ghost"
                                size="md"
                                onClick={(e) => {
                                    handleContactClick(e);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                {messages.header.cta}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

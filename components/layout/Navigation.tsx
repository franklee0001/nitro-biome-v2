'use client';

import Link from 'next/link';
import { sections, type SectionId } from '@/config/navigation';
import { Messages } from '@/lib/i18n';

interface NavigationProps {
    messages: Messages;
    activeSection: SectionId | null;
    mobile?: boolean;
    onNavClick?: () => void;
}

export function Navigation({ messages, activeSection, mobile = false, onNavClick }: NavigationProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            onNavClick?.();
        }
    };

    const navClassName = mobile
        ? 'flex flex-col gap-8 text-center items-center w-full'
        : 'hidden lg:flex items-center gap-10';

    // Base link style
    const linkBaseClassName = 'relative transition-colors duration-300 ease-out';

    // Premium animated underline for Desktop
    // Using simple pseudo-element animation
    const desktopHoverClass = 'after:content-[""] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[1px] after:bg-[var(--color-green-primary)] after:origin-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 hover:text-[var(--color-text-primary)]';

    return (
        <nav className={navClassName}>
            {sections.slice(1).map((section) => {
                const isActive = activeSection === section.id;

                let linkClassName = '';

                if (mobile) {
                    // Mobile: Larger text, simple color change
                    linkClassName = `text-2xl font-medium ${isActive
                        ? 'text-[var(--color-green-primary)]'
                        : 'text-[var(--color-text-primary)]'
                        }`;
                } else {
                    // Desktop: text-navigation, premium hover
                    linkClassName = `${linkBaseClassName} ${desktopHoverClass} text-navigation ${isActive
                        ? 'text-[var(--color-text-primary)] after:scale-x-100 after:origin-left'
                        : 'text-[var(--color-text-secondary)]'
                        }`;
                }

                return (
                    <Link
                        key={section.id}
                        href={`#${section.id}`}
                        onClick={(e) => handleClick(e, section.id)}
                        className={linkClassName}
                    >
                        {messages.nav[section.id as keyof typeof messages.nav]}
                    </Link>
                );
            })}
        </nav>
    );
}

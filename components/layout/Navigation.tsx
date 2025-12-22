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
        ? 'flex flex-col gap-6 text-center'
        : 'hidden lg:flex items-center gap-8';

    const linkBaseClassName = 'text-sm font-medium transition-all duration-200 relative';

    return (
        <nav className={navClassName}>
            {sections.slice(1).map((section) => {
                const isActive = activeSection === section.id;
                const linkClassName = mobile
                    ? `${linkBaseClassName} ${isActive ? 'text-[var(--green-primary)]' : 'text-[var(--text-primary)] hover:text-[var(--green-primary)]'} text-lg`
                    : `${linkBaseClassName} ${isActive
                        ? 'text-[var(--green-primary)] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-[var(--green-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`;

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

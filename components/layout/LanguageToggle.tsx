'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { type Locale } from '@/lib/i18n';

export function LanguageToggle() {
    const pathname = usePathname();
    const router = useRouter();
    const [currentLocale, setCurrentLocale] = useState<Locale>('ko');

    useEffect(() => {
        // Extract locale from pathname
        const locale = pathname.split('/')[1] as Locale;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentLocale(locale);
    }, [pathname]);

    const switchLocale = (newLocale: Locale) => {
        if (newLocale === currentLocale) return;

        // Save preference to cookie and localStorage
        Cookies.set('locale', newLocale, { expires: 365 });
        if (typeof window !== 'undefined') {
            localStorage.setItem('locale', newLocale);
        }

        // Navigate to new locale, preserving hash if present
        const hash = window.location.hash;
        const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.push(newPathname + hash);
    };

    return (
        <div className="flex items-center gap-1 bg-[var(--bg-secondary)] rounded-full p-1">
            <button
                onClick={() => switchLocale('ko')}
                aria-pressed={currentLocale === 'ko'}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${currentLocale === 'ko'
                    ? 'bg-[var(--green-primary)] text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
            >
                KR
            </button>
            <button
                onClick={() => switchLocale('en')}
                aria-pressed={currentLocale === 'en'}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${currentLocale === 'en'
                    ? 'bg-[var(--green-primary)] text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
            >
                EN
            </button>
        </div>
    );
}

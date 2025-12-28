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
        <div
            className="
                relative flex items-center
                rounded-full p-[3px]
                backdrop-blur-xl
                bg-white/20
                border border-white/30
                shadow-[0_2px_12px_-2px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.4)]
            "
        >
            {/* Sliding indicator */}
            <div
                style={{ left: currentLocale === 'en' ? 'calc(50% - 1px)' : '3px' }}
                className="
                    absolute top-[3px] bottom-[3px] w-[calc(50%-2px)]
                    rounded-full
                    bg-white/70
                    backdrop-blur-md
                    border border-white/50
                    shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.6)]
                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    pointer-events-none
                "
            />

            <button
                onClick={() => switchLocale('ko')}
                aria-pressed={currentLocale === 'ko'}
                className={`
                    relative z-10 px-4 py-1.5
                    text-xs font-semibold tracking-wide
                    rounded-full
                    transition-colors duration-300
                    ${currentLocale === 'ko'
                        ? 'text-neutral-800'
                        : 'text-neutral-600/70 hover:text-neutral-700'
                    }
                `}
            >
                KR
            </button>
            <button
                onClick={() => switchLocale('en')}
                aria-pressed={currentLocale === 'en'}
                className={`
                    relative z-10 px-4 py-1.5
                    text-xs font-semibold tracking-wide
                    rounded-full
                    transition-colors duration-300
                    ${currentLocale === 'en'
                        ? 'text-neutral-800'
                        : 'text-neutral-600/70 hover:text-neutral-700'
                    }
                `}
            >
                EN
            </button>
        </div>
    );
}

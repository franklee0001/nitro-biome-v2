'use client';

import { forwardRef, HTMLAttributes, ButtonHTMLAttributes } from 'react';

// ============================================
// LIQUID GLASS CONTAINER
// Apple-like frosted glass effect
// ============================================

type LiquidGlassVariant = 'nav' | 'card' | 'pill' | 'card-light';

interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
    variant?: LiquidGlassVariant;
    /** Whether the glass is over a dark/photo background (more transparency) or light background */
    onDark?: boolean;
    /** Additional intensity for blur (default uses variant-specific values) */
    blurIntensity?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
};

const variantStyles: Record<LiquidGlassVariant, {
    base: string;
    blur: string;
    bg: { dark: string; light: string };
    border: string;
    shadow: string;
    ring: string;
}> = {
    nav: {
        base: 'relative overflow-hidden',
        blur: 'backdrop-blur-xl backdrop-saturate-150',
        bg: {
            dark: 'bg-white/8',
            light: 'bg-white/60',
        },
        border: 'border border-white/20',
        shadow: 'shadow-[0_4px_24px_-8px_rgba(0,0,0,0.15)]',
        ring: 'ring-1 ring-black/5',
    },
    card: {
        base: 'relative overflow-hidden rounded-3xl',
        blur: 'backdrop-blur-2xl backdrop-saturate-150',
        bg: {
            dark: 'bg-white/10',
            light: 'bg-white/50',
        },
        border: 'border border-white/20',
        shadow: 'shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)]',
        ring: 'ring-1 ring-black/5',
    },
    'card-light': {
        base: 'relative overflow-hidden rounded-3xl',
        blur: 'backdrop-blur-2xl backdrop-saturate-150',
        bg: {
            dark: 'bg-black/20',
            light: 'bg-white/70',
        },
        border: 'border border-black/10',
        shadow: 'shadow-[0_12px_40px_-12px_rgba(0,0,0,0.2)]',
        ring: 'ring-1 ring-white/20',
    },
    pill: {
        base: 'relative overflow-hidden rounded-full',
        blur: 'backdrop-blur-xl backdrop-saturate-150',
        bg: {
            dark: 'bg-white/10',
            light: 'bg-white/50',
        },
        border: 'border border-white/25',
        shadow: 'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)]',
        ring: 'ring-1 ring-black/5',
    },
};

export const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(
    ({ variant = 'card', onDark = true, blurIntensity, className = '', children, ...props }, ref) => {
        const styles = variantStyles[variant];
        const bgClass = onDark ? styles.bg.dark : styles.bg.light;
        const blur = blurIntensity ? blurClasses[blurIntensity] : styles.blur;

        return (
            <div
                ref={ref}
                className={`
                    ${styles.base}
                    ${blur}
                    ${bgClass}
                    ${styles.border}
                    ${styles.shadow}
                    ${styles.ring}
                    ${className}
                `}
                {...props}
            >
                {/* Inner highlight - top edge shine */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    aria-hidden="true"
                />
                {/* Inner glow - subtle radial */}
                <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-60"
                    aria-hidden="true"
                />
                {/* Content */}
                <div className="relative z-10">{children}</div>
            </div>
        );
    }
);

LiquidGlass.displayName = 'LiquidGlass';

// ============================================
// LIQUID GLASS BUTTON
// Premium glass pill button with hover effects
// ============================================

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Button size */
    size?: 'sm' | 'md' | 'lg';
    /** Whether button is on dark background */
    onDark?: boolean;
    /** Visual variant */
    variant?: 'default' | 'solid';
}

const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-8 py-4 text-base',
};

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
    ({ size = 'md', onDark = true, variant = 'default', className = '', children, ...props }, ref) => {
        const bgClass = variant === 'solid'
            ? 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 hover:border-neutral-600'
            : onDark
                ? 'bg-white/10 hover:bg-white/15 border-white/25 hover:border-white/35'
                : 'bg-black/8 hover:bg-black/12 border-black/15 hover:border-black/25';

        const textClass = variant === 'solid' || onDark
            ? 'text-white'
            : 'text-neutral-900';

        const shadowClass = variant === 'solid'
            ? 'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]'
            : onDark
                ? 'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_-8px_rgba(255,255,255,0.15)]'
                : 'shadow-[0_4px_20px_-6px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.2)]';

        return (
            <button
                ref={ref}
                className={`
                    group relative inline-flex items-center justify-center
                    ${sizeClasses[size]}
                    rounded-full
                    backdrop-blur-xl backdrop-saturate-150
                    ${bgClass}
                    border
                    ${textClass}
                    font-semibold tracking-wide
                    transition-all duration-300 ease-out
                    ${shadowClass}
                    hover:-translate-y-0.5
                    active:translate-y-0 active:shadow-[0_2px_12px_-4px_rgba(0,0,0,0.2)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                    overflow-hidden
                    ${className}
                `}
                {...props}
            >
                {/* Inner top highlight */}
                <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    aria-hidden="true"
                />

                {/* Specular shine sweep on hover */}
                <span
                    className="
                        pointer-events-none absolute inset-0 -translate-x-full
                        bg-gradient-to-r from-transparent via-white/20 to-transparent
                        group-hover:translate-x-full
                        transition-transform duration-700 ease-out
                        skew-x-12
                    "
                    aria-hidden="true"
                />

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>
            </button>
        );
    }
);

GlassButton.displayName = 'GlassButton';

// ============================================
// GLASS NAV BAR
// Scroll-aware navigation bar with liquid glass
// ============================================

interface GlassNavProps extends HTMLAttributes<HTMLElement> {
    /** Whether page has been scrolled */
    isScrolled?: boolean;
}

export const GlassNav = forwardRef<HTMLElement, GlassNavProps>(
    ({ isScrolled = false, className = '', children, ...props }, ref) => {
        return (
            <header
                ref={ref}
                className={`
                    fixed top-0 left-0 right-0 z-50
                    transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                    ${isScrolled
                        ? 'py-3 lg:py-4 backdrop-blur-xl backdrop-saturate-150 bg-white/70 border-b border-black/8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)]'
                        : 'py-5 lg:py-8 backdrop-blur-md bg-white/40 border-b border-transparent'
                    }
                    ${className}
                `}
                {...props}
            >
                {/* Top edge highlight (more visible when scrolled) */}
                <div
                    className={`
                        pointer-events-none absolute inset-x-0 top-0 h-px
                        bg-gradient-to-r from-transparent via-white/60 to-transparent
                        transition-opacity duration-500
                        ${isScrolled ? 'opacity-100' : 'opacity-0'}
                    `}
                    aria-hidden="true"
                />
                {children}
            </header>
        );
    }
);

GlassNav.displayName = 'GlassNav';

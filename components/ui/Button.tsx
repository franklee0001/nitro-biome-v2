import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

    const variantStyles = {
        primary: 'bg-[var(--color-green-deep)] text-white hover:bg-[var(--color-green-primary)] focus:ring-[var(--color-green-primary)] shadow-lg hover:shadow-xl',
        secondary: 'bg-[var(--color-text-primary)] text-white hover:bg-[var(--color-text-secondary)] focus:ring-[var(--color-text-primary)] shadow-lg',
        ghost: 'border-2 border-[var(--color-green-primary)] text-[var(--color-green-primary)] bg-transparent hover:bg-[var(--color-green-primary)] hover:text-white focus:ring-[var(--color-green-primary)]',
    };

    const sizeStyles = {
        sm: 'px-5 py-2.5 text-sm',
        md: 'px-7 py-3.5 text-base',
        lg: 'px-10 py-5 text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

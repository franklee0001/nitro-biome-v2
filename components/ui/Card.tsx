import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = '' }: CardProps) {
    return (
        <div
            className={`bg-white rounded-2xl p-8 shadow-sm border border-[var(--bg-secondary)] transition-all duration-300 hover:shadow-md ${className}`}
        >
            {children}
        </div>
    );
}

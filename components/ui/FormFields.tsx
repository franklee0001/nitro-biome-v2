'use client';

import React from 'react';

interface BaseFieldProps {
    label: string;
    id: string;
    required?: boolean;
    error?: string;
}

export function FormField({ label, id, children, error }: BaseFieldProps & { children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] ml-1">
                {label}
            </label>
            {children}
            {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
        </div>
    );
}

export function InputField({ label, id, ...props }: BaseFieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <FormField label={label} id={id}>
            <input
                id={id}
                {...props}
                className="w-full h-14 px-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-transparent focus:border-[var(--color-green-primary)]/30 focus:bg-white focus:outline-none transition-all duration-300 text-[var(--color-text-primary)] shadow-sm focus:shadow-md"
            />
        </FormField>
    );
}

export function SelectField({ label, id, options, ...props }: BaseFieldProps & React.SelectHTMLAttributes<HTMLSelectElement> & { options: Record<string, string> }) {
    return (
        <FormField label={label} id={id}>
            <div className="relative">
                <select
                    id={id}
                    {...props}
                    className="w-full h-14 px-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-transparent focus:border-[var(--color-green-primary)]/30 focus:bg-white focus:outline-none transition-all duration-300 text-[var(--color-text-primary)] shadow-sm appearance-none cursor-pointer"
                >
                    {Object.entries(options).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </FormField>
    );
}

export function TextAreaField({ label, id, ...props }: BaseFieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <FormField label={label} id={id}>
            <textarea
                id={id}
                {...props}
                className="w-full p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-transparent focus:border-[var(--color-green-primary)]/30 focus:bg-white focus:outline-none transition-all duration-300 text-[var(--color-text-primary)] shadow-sm focus:shadow-md resize-none"
            />
        </FormField>
    );
}

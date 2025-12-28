'use client';

import { MessageCircle } from 'lucide-react';

export function FloatingContactButton() {
    const handleClick = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <button
            onClick={handleClick}
            className="
                fixed bottom-6 right-6 z-50
                w-14 h-14
                bg-emerald-600 hover:bg-emerald-700
                text-white
                rounded-full
                shadow-lg shadow-emerald-600/30
                hover:shadow-xl hover:shadow-emerald-600/40
                transition-all duration-300
                flex items-center justify-center
                hover:scale-105
                active:scale-95
            "
            aria-label="Contact Us"
        >
            <MessageCircle size={24} />
        </button>
    );
}

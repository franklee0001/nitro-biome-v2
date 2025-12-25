// i18n utilities and types
export type Locale = 'ko' | 'en';

export const locales: Locale[] = ['ko', 'en'];
export const defaultLocale: Locale = 'ko';

// Type-safe message loading
export async function getMessages(locale: Locale) {
    try {
        const messages = await import(`@/messages/${locale}.json`);
        return messages.default;
    } catch (error) {
        console.error(`Failed to load messages for locale: ${locale}`, error);
        // Fallback to default locale
        const fallback = await import(`@/messages/${defaultLocale}.json`);
        return fallback.default;
    }
}

// Type for messages structure
export type Messages = {
    nav: Record<string, string>;
    header: Record<string, string>;
    hero: Record<string, string>;
    noPrimer: {
        steps: string[];
    };
    journey: {
        headline: string;
        cardLabel: string;
        cardTitle: string;
        cardDescription: string;
        cta: string;
    };
    mechanism: {
        title: string;
        subtitle: string;
        scenes: Record<string, { title: string; description: string }>;
    };
    evidence: {
        title: string;
        subtitle: string;
        cards: Record<string, {
            title: string;
            value: string;
            unit: string;
            description: string;
            note: string;
        }>;
    };
    product: Record<string, string>;
    faq: {
        title: string;
        questions: Record<string, { q: string; a: string }>;
    };
    contact: {
        title: string;
        subtitle: string;
        form: {
            name: string;
            email: string;
            purpose: string;
            purposeOptions: {
                personal: string;
                b2b: string;
                other: string;
            };
            message: string;
            submit: string;
            success: string;
            error: string;
            trust: string;
        };
    };
    footer: Record<string, string>;
};

// Helper to validate locale
export function isValidLocale(locale: string): locale is Locale {
    return locales.includes(locale as Locale);
}

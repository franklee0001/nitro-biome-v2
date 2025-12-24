import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { getMessages, isValidLocale, type Locale } from '@/lib/i18n';

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
    return [
        { locale: 'ko' },
        { locale: 'en' },
    ];
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = await params;

    // Validate locale
    if (!isValidLocale(locale)) {
        notFound();
    }

    // Load messages
    const messages = await getMessages(locale as Locale);

    return (
        <SmoothScrollProvider>
            <Header messages={messages} />
            <main>{children}</main>
        </SmoothScrollProvider>
    );
}



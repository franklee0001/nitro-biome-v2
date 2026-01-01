import { getMessages, type Locale } from '@/lib/i18n';
import { Hero } from '@/components/sections/Hero';
import { DualPromo } from '@/components/sections/DualPromo';
import { NOPrimer } from '@/components/sections/NOPrimer';
import { JourneySection } from '@/components/sections/JourneySection';
import { Mechanism } from '@/components/sections/Mechanism';
import { Evidence } from '@/components/sections/Evidence';
import { Product } from '@/components/sections/Product';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
    const { locale } = await params;
    const messages = await getMessages(locale as Locale);

    return (
        <>
            <Hero messages={messages} />
            <DualPromo />
            <NOPrimer messages={messages} />
            <JourneySection messages={messages} />
            <Mechanism messages={messages} />
            <Evidence messages={messages} />
            <Product messages={messages} />
            <FAQ messages={messages} />
            <Contact messages={messages} />
            <Footer messages={messages} />
        </>
    );
}

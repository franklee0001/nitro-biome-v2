import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isValidLocale, type Locale } from './lib/i18n';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if pathname already has a locale
    const pathnameHasLocale = pathname.startsWith('/ko') || pathname.startsWith('/en');

    if (pathnameHasLocale) {
        // Extract locale from pathname
        const locale = pathname.split('/')[1] as string;

        // Validate locale
        if (!isValidLocale(locale)) {
            // Invalid locale, redirect to default
            const url = request.nextUrl.clone();
            url.pathname = `/${defaultLocale}${pathname.substring(3)}`;
            return NextResponse.redirect(url);
        }

        // Set locale cookie
        const response = NextResponse.next();
        response.cookies.set('locale', locale, {
            maxAge: 60 * 60 * 24 * 365, // 1 year
            path: '/',
        });
        return response;
    }

    // No locale in pathname, redirect to default locale
    // Check if there's a saved locale preference
    const savedLocale = request.cookies.get('locale')?.value as Locale | undefined;
    const targetLocale = savedLocale && isValidLocale(savedLocale) ? savedLocale : defaultLocale;

    const url = request.nextUrl.clone();
    url.pathname = `/${targetLocale}${pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        // Match all paths except static files and API routes
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|videos|lottie).*)',
    ],
};

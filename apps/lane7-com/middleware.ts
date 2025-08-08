import { DEFAULT_COUNTRY, getSupportedCountryKeys, isCountrySupported } from '@lane7/shared/config/countries';
import { geolocation } from '@vercel/functions';
import { NextRequest, NextResponse } from 'next/server';

// Cache supported countries to avoid repeated function calls
const SUPPORTED_COUNTRIES = getSupportedCountryKeys();

function getCountryFromRequest(request: NextRequest): string {
  try {
    const { country } = geolocation(request);

    if (!country) {
      return DEFAULT_COUNTRY;
    }

    const countryLower = country.toLowerCase();
    return isCountrySupported(countryLower) ? countryLower : DEFAULT_COUNTRY;
  } catch (error) {
    // Geolocation can fail in development or edge cases
    console.warn('Geolocation failed, using default:', DEFAULT_COUNTRY);
    return DEFAULT_COUNTRY;
  }
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Early exit: check if URL already has supported country prefix
  const hasCountryPrefix = SUPPORTED_COUNTRIES.some(
    country => pathname === `/${country}` || pathname.startsWith(`/${country}/`)
  );

  if (hasCountryPrefix) {
    return NextResponse.next();
  }

  // Get country code and redirect
  const countryCode = getCountryFromRequest(request);

  // Build redirect URL preserving query params
  const redirectUrl = new URL(`/${countryCode}${pathname}${search}`, request.url);

  return NextResponse.redirect(redirectUrl, 302);
}

export const config = {
  matcher: [
    // Skip static files, API routes, and Next.js internals
    '/((?!api|admin|_next|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)'
  ]
};

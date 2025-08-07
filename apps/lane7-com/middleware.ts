import { DEFAULT_COUNTRY, getSupportedCountryKeys, isCountrySupported } from '@lane7/shared/config/countries';
import { geolocation } from '@vercel/functions';
import { NextRequest, NextResponse } from 'next/server';

function getCountryCode(request: NextRequest): string {
  const { country } = geolocation(request);

  if (!country) return DEFAULT_COUNTRY;

  const countryLower = country.toLowerCase();
  return isCountrySupported(countryLower) ? countryLower : DEFAULT_COUNTRY;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if URL already has a supported country code
  const alreadyHasCountry = getSupportedCountryKeys().some(
    country => pathname.startsWith(`/${country}/`) || pathname === `/${country}`
  );

  if (alreadyHasCountry) {
    return NextResponse.next();
  }

  // Get country code and redirect
  const countryCode = getCountryCode(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${countryCode}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Excluir archivos estáticos, API y rutas admin
    '/((?!api|admin|_next/static|_next/image|favicon.ico|.*\\.).*)'
  ]
};

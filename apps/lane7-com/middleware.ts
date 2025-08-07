import { geolocation } from '@vercel/functions';
import { NextRequest, NextResponse } from 'next/server';

// Países soportados en tu app
const SUPPORTED_COUNTRIES = ['de', 'uk', 'nl', 'us', 'de'];
const DEFAULT_COUNTRY = 'us';

function getCountryCode(request: NextRequest): string {
  const { country } = geolocation(request);
  const lower = country?.toLowerCase();
  if (!lower) return DEFAULT_COUNTRY;
  return SUPPORTED_COUNTRIES.includes(lower) ? lower : DEFAULT_COUNTRY;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const alreadyHasCountry = SUPPORTED_COUNTRIES.some(
    country => pathname.startsWith(`/${country}/`) || pathname === `/${country}`
  );

  if (alreadyHasCountry) {
    return NextResponse.next();
  }

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

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith('/de')) {
    return NextResponse.next();
  }

  const rewriteUrl = new URL(`/de${pathname}${search}`, request.url);
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    // Skip static files, API routes, and Next.js internals
    '/((?!api|admin|_next|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)'
  ]
};

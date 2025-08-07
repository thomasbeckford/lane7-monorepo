// apps/lane7-de/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/de' || pathname.startsWith('/de/')) {
    return NextResponse.next();
  }

  // ✨ Siempre reescribir a /de + la ruta actual
  const url = new URL(`/de${pathname}`, request.url);
  url.search = request.nextUrl.search;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Excluir archivos estáticos, API y rutas admin
    '/((?!api|admin|_next/static|_next/image|favicon.ico|.*\\.).*)'
  ]
};

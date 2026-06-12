import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple auth protection for /dashboard routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth-token')?.value;

    // In real app, validate JWT or session here
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

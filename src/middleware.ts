import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Exemple : redirection si l'utilisateur n'est pas connecté
  const isAuthenticated = request.cookies.get('token');
  const isEmailVerified = request.cookies.get('emailVerified')?.value === 'true';

  if(isAuthenticated && !isEmailVerified) {
    return NextResponse.redirect(new URL('/verify-email', request.url));
  }

  if (!isAuthenticated && (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname === '/api/logout')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }else if (isAuthenticated && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}
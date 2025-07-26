import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Exemple : redirection si l'utilisateur n'est pas connecté
  const isAuthenticated = request.cookies.get('token');
  const isEmailVerified = request.cookies.get('emailVerified');

  if(isAuthenticated && !isEmailVerified) {
    return NextResponse.redirect(new URL('/verify-email', request.url));
  }

  if (!isAuthenticated && (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname === '/api/logout')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }else if (isAuthenticated && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/logout', '/login'], // S’applique uniquement aux routes /dashboard/*
};
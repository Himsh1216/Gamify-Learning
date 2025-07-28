import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';

export async function middleware(req: NextRequest) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

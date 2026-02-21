import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Allow all origins in development, or specify allowed origins for production
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://salonblog.vercel.app']
  : ['http://localhost:3001', 'https://salonblog.vercel.app'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Handle CORS
  const origin = request.headers.get('origin');
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version');
  }

  // Handle Preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: response.headers });
  }

  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  if (token && ['/signin', '/salon/signup', '/salon/signup/otp'].includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/signin',
    '/salon/signup',
    '/salon/signup/otp'
  ],
};
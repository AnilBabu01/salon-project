import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const response = NextResponse.json({ message: 'Logout successful' });
  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  });
  return response;
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 200 });
}
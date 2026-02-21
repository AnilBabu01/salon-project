import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/model/User';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 });
    }

    const newUser = new User({
      username: name,
      email,
      password,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: newUser._id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });

    const sanitizedUser = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      name: newUser.username, // Since we don't have firstName and lastName, we'll use username as name
    };

    const response = NextResponse.json({
      message: 'User created successfully',
      user: sanitizedUser,
      isAuthenticated: true
    }, { status: 201 });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/'
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'An error occurred during signup' }, { status: 500 });
  }
}
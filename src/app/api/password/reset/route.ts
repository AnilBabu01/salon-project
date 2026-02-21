import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/model/User';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({
        error: 'Token and password are required'
      }, { status: 400 });
    }

    await dbConnect();

    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return NextResponse.json({
        error: 'Invalid or expired reset token'
      }, { status: 400 });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return NextResponse.json({
      message: 'Password reset successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({
      error: 'Error resetting password'
    }, { status: 500 });
  }
}
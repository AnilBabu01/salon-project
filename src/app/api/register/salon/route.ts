import { dbConnect } from "@/lib/dbConnect";
import { generateOTP } from "@/lib/security";
import LoginModel from "@/model/Login";
import OtpModel from "@/model/Otp";
import SalonModel from "@/model/Salon";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, businessName, phoneNumber, password } = await req.json();

  console.log({ firstName, lastName, email, businessName, phoneNumber, password });

  try {
    await dbConnect();

    // check if account exists
    const oldSalon = await SalonModel.findOne({ email });
    if (oldSalon?.verified) {
      return NextResponse.json({ message: 'Account already exists!' }, { status: 401 });
    } else {
      // clean all unverified cache
      await LoginModel.deleteOne({ email });
      await OtpModel.deleteOne({ email });
      await oldSalon?.deleteOne();
    }

    // Now, create new account for the salon
    const salon = new SalonModel({ firstName, lastName, email, businessName, phoneNumber });
    const salonCreated = await salon.save();
    if (!salonCreated) return NextResponse.json({ message: 'Unable to register salon!' }, { status: 401 });

    // create a hashed password for this account and login credentials
    const hashPass = await bcrypt.hash(password, 8);
    const login = new LoginModel({ email, password: hashPass });
    const loginCreated = await login.save();
    if (!loginCreated) {
      await SalonModel.deleteOne({ _id: salonCreated._id });
      return NextResponse.json({ message: 'Unable to register salon!' }, { status: 401 });
    }

    // Now generating 
    const OTP = generateOTP();
    const hashOtp = await bcrypt.hash(OTP, 8);
    const otp = new OtpModel({ otp: hashOtp, email });
    const otpCreated = await otp.save();
    if (!otpCreated) {
      await SalonModel.deleteOne({ _id: salonCreated._id });
      await LoginModel.deleteOne({ _id: loginCreated._id });
      return NextResponse.json({ message: 'Unable to register salon!' }, { status: 401 });
    }

    console.log({ salon, login, OTP, otp });

    // Add your logic to handle registration, like saving the data to a database.
    return NextResponse.json({ message: 'Registration successful' });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}
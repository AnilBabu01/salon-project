import { dbConnect } from "@/lib/dbConnect";
import OtpModel from "@/model/Otp";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import SalonModel from "@/model/Salon";
import LoginModel from "@/model/Login";


export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  const OTP_VALID_FOR = 5 * 60; // 5 minutes
  console.log({ email, otp, OTP_VALID_FOR });

  // this is authenticated route
  try {
    await dbConnect();
    const found = await OtpModel.findOne({ email });
    if (!found) {
      return NextResponse.json({ message: 'Invalid OTP!' }, { status: 401 });
    }
    const matched = await bcrypt.compare(otp, found.otp);
    const valid = (found.createdAt.getTime() + OTP_VALID_FOR * 1000) >= Date.now();
    console.log({ matched, valid });
    if (!matched || !valid) {
      return NextResponse.json({ message: 'Invalid OTP!' }, { status: 401 });
    }
    // delete the otp
    await found.deleteOne();

    // also mark the records as verified
    await SalonModel.updateOne({ email }, { verified: true, registrationStage: 1 });
    await LoginModel.updateOne({ email }, { isVerified: true });

    // Add your logic to handle registration, like saving the data to a database.
    return NextResponse.json({ message: "Successful" });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { email, _id } = await getToken({ req }) as { email: string, _id: string; };
    console.log({ email, _id });

    return NextResponse.json({
      message: "success",
      data: []
    });
  } catch (error) {
    // Handle any errors
    return NextResponse.json({
      error: "Something went wrong!",
    });
  }
}
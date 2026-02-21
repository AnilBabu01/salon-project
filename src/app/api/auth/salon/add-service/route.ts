import SalonModel from "@/model/Salon";
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


export async function POST(req: NextRequest) {
  try {
    const { email, _id } = await getToken({ req }) as { email: string, _id: string; };
    if (!email || !_id) {
      return NextResponse.json({
        error: "Unauthorized!",
      }, { status: 401 });
    }
    const { serviceFor, aboutBusiness, whereToServe } = await req.json();
    console.log({ serviceFor, aboutBusiness, whereToServe });

    if (!serviceFor || !aboutBusiness || !whereToServe) {
      return NextResponse.json({
        error: "Invalid request!",
      }, { status: 400 });
    }

    const update = await SalonModel.findByIdAndUpdate(_id, {
      whereToProvide: whereToServe,
      whomToProvide: serviceFor,
      description: aboutBusiness,
      registrationStage: 2
    });

    if (!update) {
      return NextResponse.json({
        error: "Unable to update!",
      }, { status: 400 });
    }

    return NextResponse.json({
      message: "success",
    });

  } catch (error) {
    // Handle any errors
    return NextResponse.json({
      error: "Something went wrong!",
    });
  }
}
import { dbConnect } from "@/lib/dbConnect";
import BusinessTypeModel from "@/model/BusinessType";
import SalonModel from "@/model/Salon";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, _id } = await getToken({ req }) as { email: string, _id: string; };
    if (!email || !_id) {
      return NextResponse.json({
        error: "Unauthorized!",
      }, { status: 401 });
    }
    const { types } = await req.json();

    await dbConnect();
    const done = await SalonModel.updateOne({ email }, { categoryIds: types, registrationStage: 2 });
    if (!done) {
      return NextResponse.json({
        error: "Unable to update",
      }, { status: 401 });
    }

    return NextResponse.json({
      message: "success",
      data: []
    });

  } catch (error) {
    // Handle any errors
    return NextResponse.json({
      error: "Something went wrong!",
    }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  try {
    const { email, _id } = await getToken({ req }) as { email: string, _id: string; };
    if (!email || !_id) {
      return NextResponse.json({
        error: "Unauthorized!",
      }, { status: 401 });
    }

    await dbConnect();
    const businesses = await BusinessTypeModel.find();
    const selected = await SalonModel.findById(_id).then(r => r?.categoryIds);
    console.log({ selected });

    return NextResponse.json({
      message: "success",
      data: businesses.length ? businesses.map(d => ({ _id: d._id, name: d.name })) : [],
      selected: selected
    });

  } catch (error) {
    // Handle any errors
    return NextResponse.json({
      error: "Something went wrong!",
    }, { status: 500 });
  }
}
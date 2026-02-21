import { dbConnect } from "@/lib/dbConnect";
import SalonModel from "@/model/Salon";
import SalonImgModel from "@/model/SalonImage";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { email, _id } = await getToken({ req }) as { email: string, _id: string; };
    console.log({ email, _id });
    if (!email || !_id) {
      return NextResponse.json({
        error: "Unauthorized!",
      }, { status: 401 });
    }

    await dbConnect();
    const img = await SalonImgModel.findOne({ email });
    if (!img) {
      return NextResponse.json({
        error: "Not found images!",
      }, { status: 400 });
    }
    const service = await SalonModel.findById(_id, {
      whereToProvide: 1, whomToProvide: 1,
      description: 1, registrationStage: 1
    }).lean();

    return NextResponse.json({
      message: "success",
      data: {
        hero: img?.heroImage,
        menu: img?.menuImages ?? [],
        cert: img?.certificateImages ?? [],
        business: img?.businessImages ?? [],
        ...service
      }
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
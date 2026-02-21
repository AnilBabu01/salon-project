import { dbConnect } from "@/lib/dbConnect";
import BusinessHoursModel from "@/model/BusinessHour";
import SalonModel from "@/model/Salon";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { email, _id } = await getToken({ req }) as { email: string, _id: string; };
    if (!email || !_id) {
      return NextResponse.json({
        error: "Unauthorized!",
      }, { status: 401 });
    }

    await dbConnect();
    const hr = await BusinessHoursModel.find().lean();
    const salonHr = await SalonModel.findOne({ email }).then(r => r?.businessHours);
    if (!hr) {
      return NextResponse.json({
        error: "Not found images!",
      }, { status: 401 });
    }

    return NextResponse.json({
      message: "success",
      data: hr.length ? hr.map(d => ({
        _id: d._id,
        day: d.day,
        startTime: d.startTime,
        endTime: d.endTime,
      })) : [],
      selected: salonHr ?? []
    });

  } catch (error) {
    // Handle any errors
    return NextResponse.json({
      error: "Something went wrong!",
    }, { status: 500 });
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
    const { hours } = await req.json();
    console.log({ hours });

    await dbConnect();
    const done = await SalonModel.updateOne({ email }, {
      businessHours: hours,
      registrationStage: 4 // Business hours updated means registration stage 4
    });

    if (!done) {
      return NextResponse.json({
        error: "Unable to update!",
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
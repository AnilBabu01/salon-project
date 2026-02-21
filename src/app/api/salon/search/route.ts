import { NextRequest, NextResponse } from "next/server";
import SalonList from "@/model/SalonList";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    console.log("Full URL:", req.nextUrl.toString());
    console.log("Search Params:", req.nextUrl.searchParams.toString());

    const { searchParams } = req.nextUrl;
    const map = searchParams.get("map");
    const name = searchParams.get("name");

    let query: any = {};
    if (map) query.map = map;
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    const salons = await SalonList.find(query);

    return NextResponse.json({
      message: "success",
      data: salons,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}

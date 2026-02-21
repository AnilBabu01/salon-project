import AddressModel from "@/model/Address";
import SalonModel from "@/model/Salon";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, _id } = await getToken({ req }) as { email: string, _id: string; };
    console.log({ email, _id });
    const { address, street, city, state, zip, country } = await req.json();

    console.log({ address, street, city, state, zip, country });

    let found = await AddressModel.findOne({ salonId: _id });
    if (found) {
      await found.updateOne({
        address, street, city, state, zip, country
      });
    } else {
      found = await AddressModel.create({
        salonId: _id, address, street, city, state, zip, country
      });
      if (!found) {
        return NextResponse.json({
          message: "Unable to update address!",
        }, { status: 400 });
      }
    }

    const salon = await SalonModel.findByIdAndUpdate(_id, {
      addressId: found._id, registrationStage: 3 // Address updated means registration stage 3
    });

    if (!salon) {
      found.deleteOne(); // Delete the address if salon not updated
      return NextResponse.json({
        message: "Unable to update address!",
      }, { status: 400 });
    }

    return NextResponse.json({
      message: "Updated the address",
    });
  } catch (error) {
    // Handle any errors
    return NextResponse.json({
      error: "Something went wrong!",
    });
  }
}


export async function GET(req: NextRequest) {
  try {
    const { email, _id } = await getToken({ req }) as { email: string, _id: string; };
    console.log({ email, _id });

    const add = await AddressModel.findOne({ salonId: _id });
    if (add) {
      return NextResponse.json({
        message: "success",
        data: add
      });
    }

    return NextResponse.json({
      message: "success",
    }, { status: 400 });
  } catch (error) {
    // Handle any errors
    return NextResponse.json({
      error: "Something went wrong!",
    });
  }
}
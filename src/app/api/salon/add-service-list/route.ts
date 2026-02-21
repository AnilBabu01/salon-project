import { dbConnect } from "@/lib/dbConnect";
import SalonModel from "@/model/Salon";
import SalonImgModel from "@/model/SalonImage";
import ServiceDetailsModel, { ServiceDetailsSchema } from "@/model/Services";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { email, _id } = await getToken({ req }) as { email: string, _id: string; };
    console.log({ email, _id });

    await dbConnect();
    const images = await SalonImgModel.findOne({ salonId: _id, }, { serviceImages: 1 }).lean();
    const services = await ServiceDetailsModel.find({ salonId: _id }).lean();
    const serviceMap = new Map();
    services.forEach((s) => {
      serviceMap.set(String(s._id), s);
    });

    // @ts-ignore
    images.serviceImages?.forEach((img) => {
      // @ts-ignore
      const service = serviceMap.get(String(img.serviceId));
      if (service) {
        // @ts-ignore
        service.img = img;
      }
    });

    const data = Array.from(serviceMap.values());

    return NextResponse.json({
      message: "success",
      data
    });
  } catch (error) {
    console.log({ error });
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
    const {
      serviceId,
      serviceName,
      serviceHours,
      serviceMinutes,
      serviceType,
      servicePrice,
      mobile,
    } = await req.json();

    console.log({
      serviceId,
      serviceName,
      serviceHours,
      serviceMinutes,
      serviceType,
      servicePrice,
      mobile,
    });

    if (!serviceName || !serviceHours || !serviceMinutes || !serviceType || !servicePrice) {
      return NextResponse.json({
        error: "Invalid request!",
      }, { status: 400 });
    }

    await dbConnect();
    const service = serviceId
      ? await ServiceDetailsModel.findByIdAndUpdate(serviceId, {
        serviceName,
        serviceHours: parseInt(serviceHours),
        serviceMinutes: parseInt(serviceMinutes),
        serviceType: parseInt(serviceType),
        servicePrice: parseInt(servicePrice),
        mobile: !!mobile,
      })
      : await ServiceDetailsModel.create({
        salonId: _id,
        serviceName,
        serviceHours: parseInt(serviceHours),
        serviceMinutes: parseInt(serviceMinutes),
        serviceType: parseInt(serviceType),
        servicePrice: parseInt(servicePrice),
        mobile: !!mobile,
      });

    console.log({ service });

    if (!service) {
      return NextResponse.json({
        error: "Unable to update!",
      }, { status: 400 });
    }

    return NextResponse.json({
      message: "success",
      data: service,
    });

  } catch (error) {
    console.log({ error });
    // Handle any errors
    return NextResponse.json({
      error: "Something went wrong!",
    });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const { email, _id } = await getToken({ req }) as { email: string, _id: string; };
    if (!email || !_id) {
      return NextResponse.json({
        error: "Unauthorized!",
      }, { status: 401 });
    }

    const serviceId = req.nextUrl.searchParams.get('serviceId');

    console.log({ serviceId });
    if (!serviceId) {
      return NextResponse.json({
        error: "Invalid request!",
      }, { status: 400 });
    }

    await dbConnect();
    const service = await ServiceDetailsModel.findByIdAndDelete(serviceId);
    console.log({ service });
    const images = await SalonImgModel.findOne({ salonId: _id, }, { serviceImages: 1 }).lean();
    // @ts-ignore
    const newImages = images.serviceImages.filter((img) => img.serviceId !== serviceId);
    await SalonImgModel.findOneAndUpdate({ salonId: _id }, { serviceImages: newImages });

    if (!service) {
      return NextResponse.json({
        error: "Unable to delete!",
      }, { status: 400 });
    }

    return NextResponse.json({
      message: "success",
    });

  } catch (error) {
    console.log({ error });
    // Handle any errors
    return NextResponse.json({
      error: "Something went wrong!",
    });
  }
}
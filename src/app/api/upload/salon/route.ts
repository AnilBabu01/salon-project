import { dbConnect } from '@/lib/dbConnect';
import s3 from '@/lib/s3';
import SalonFileModel from '@/model/File';
import SalonImgModel from '@/model/SalonImage';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

type IncomingFile = FormDataEntryValue & {
  arrayBuffer: () => Promise<ArrayBuffer>;
  name: string;
  type: string;
  size: number,
  lastModified: number;
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { email, _id } = await getToken({ req }) as { email: string, _id: string; };
  if (!email || !_id) {
    return NextResponse.json({ error: "Unauthorized!" });
  }

  const formData = await req.formData();
  const files: IncomingFile[] = [];

  let fileCount = 0;
  while (true) {
    const f = formData.get(`file-${fileCount}`) as IncomingFile;
    if (!f || fileCount >= 20) break;
    files.push(f);
    fileCount += 1;
  }

  const imgType = formData.get("type") as "hero" | "business" | "menu" | "cert" | "service";
  const serviceId = formData.get("serviceId") as string;
  if (!["hero", "business", "menu", "cert", "service"].includes(imgType)) {
    return NextResponse.json({ error: "Types didn't match" });
  }
  if (!files.length) {
    return NextResponse.json({ error: "No files received." });
  }

  console.log({ files });

  await dbConnect();
  for (const file of files) {
    if (!["image/png", 'image/jpeg'].includes(file.type)) {
      throw new Error("Invalid file");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    try {
      console.log({ file });
      // Define S3 upload parameters
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME, // Replace with your bucket name
        Key: `uploads/${Date.now()}-${file.name}`.replaceAll(" ", "_"), // Define file path in S3
        Body: buffer, // Use the buffer from multer
        ContentType: file.type, // Optional: Define content type
      };

      // @ts-ignore
      const data = await s3.upload(uploadParams).promise();

      console.log({ data });

      let img = await SalonImgModel.findOne({ email });
      if (!img) {
        img = await SalonImgModel.create({ email, salonId: _id });
        img = await SalonImgModel.findOne({ email });
      }

      if (imgType == "hero") {
        const heroKey = img?.heroImage;
        console.log({ heroKey });
        if (heroKey) {
          await s3.deleteObject({
            // @ts-ignore
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            // @ts-ignore
            Key: heroKey.key,
          }).promise();
        }
        await img?.updateOne({
          heroImage: {
            url: data.Location,
            key: data.Key
          }
        });
      } else if (imgType == "menu") {
        await img?.updateOne({
          $push: {
            menuImages: {
              url: data.Location,
              key: data.Key
            }
          }
        });
      } else if (imgType == "business") {
        await img?.updateOne({
          $push: {
            businessImages: {
              url: data.Location,
              key: data.Key
            }
          }
        });
      } else if (imgType == "cert") {
        await img?.updateOne({
          $push: {
            certificateImages: {
              url: data.Location,
              key: data.Key
            }
          }
        });
      } else if (imgType == "service" && serviceId) {
        await img?.updateOne({
          $push: {
            serviceImages: {
              serviceId,
              url: data.Location,
              key: data.Key
            }
          }
        });
      }
    } catch (error) {
      console.log("Error occured ", error);
      return NextResponse.json({ error: "Failed uploading image." });
    }
  };

  return NextResponse.json({
    message: "Uploaded!",
  });
};


export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const { email, _id } = await getToken({ req }) as { email: string, _id: string; };
    if (!email || !_id) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
    }

    // Extract imgId from query parameters
    const imgId = req.nextUrl.searchParams.get('imgId');
    const imgType = req.nextUrl.searchParams.get('imgType') as ImgTypes;

    console.log({ imgId, imgType });

    if (!imgId || !imgType) {
      return NextResponse.json({ error: 'imgId and imgType is required' }, { status: 400 });
    }

    const query =
      imgType == "menu"
        ? {
          salonId: _id,
          menuImages: { $elemMatch: { key: imgId } },
        }
        : imgType == "cert"
          ? {
            salonId: _id,
            certificateImages: { $elemMatch: { key: imgId } },
          }
          : imgType == "business"
            ? {
              salonId: _id,
              businessImages: { $elemMatch: { key: imgId } },
            }
            : imgType == "service"
              ? {
                salonId: _id,
                serviceImages: { $elemMatch: { _id: imgId } },
              }
              : null;

    if (!query) {
      return NextResponse.json({ error: "Invalid imgType!" }, { status: 400 });
    }

    const imgObj = await SalonImgModel.findOne(query).lean();
    console.log({ imgObj });

    if (!imgObj) {
      return NextResponse.json({ error: "Image don't exist" }, { status: 400 });
    }
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imgId,
    };

    // @ts-ignore
    await s3.deleteObject(deleteParams).promise();

    const removeQuery =
      imgType == "menu"
        ? { menuImages: { key: imgId } }
        : imgType == "cert"
          ? { certificateImages: { key: imgId } }
          : imgType == "business"
            ? { businessImages: { key: imgId } }
            : imgType == "service"
              ? { serviceImages: { _id: imgId } }
              : null;

    await SalonImgModel.updateOne(
      { salonId: _id },
      { $pull: removeQuery! }
    );

    // Perform the delete operation using imgId here
    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
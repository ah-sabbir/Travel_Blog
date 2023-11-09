import cloudinary from "cloudinary";
import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import { CreateRegionInput } from "@/dtos/region/create-region.dto";
import Region from "@/models/Region";
import Country from "@/models/Country";

export async function POST(req: Request) {
  try {
    const body: CreateRegionInput = await req.json();

    const { name, slug, description, content, thumbnail, banner, countryId } =
      body;

    if (!name || !slug || !description || !content) {
      return NextResponse.json({
        ok: false,
        error:
          "Thiếu tên, đường dẫn, mô tả hoặc thông tin vắn tắt của tỉnh / vùng miền",
      });
    }

    let savedThumbnail = { public_id: "", url: "" };
    const processedThumbnail = await editCloudinaryImage(thumbnail);
    if (processedThumbnail) {
      savedThumbnail = {
        public_id: processedThumbnail.public_id,
        url: processedThumbnail.secure_url,
      };
    }

    let savedBanner = { public_id: "", url: "" };
    const processedBanner = await editCloudinaryImage(banner);
    if (processedBanner) {
      savedBanner = {
        public_id: processedBanner.public_id,
        url: processedBanner.secure_url,
      };
    }

    await dbConnect();

    const region = await Region.create({
      name,
      slug,
      description,
      content,
      thumbnail: savedThumbnail,
      banner: savedBanner,
    });

    if (!countryId) {
      const country: any = Country.findById(countryId).select("regions");

      if (!country) {
        return NextResponse.json({
          ok: false,
          error: `Không tìm thấy quốc gia`,
        });
      }

      country.regions.push(region._id);

      country.save();
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message,
    });
  }
}

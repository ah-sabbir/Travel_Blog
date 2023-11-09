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
      countryId,
    });

    if (countryId) {
      const country: any = await Country.findById(countryId).select("regions");

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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số id của tỉnh / vùng miền",
      });
    }

    await dbConnect();

    const region = await Region.findById(id);

    if (!region) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy quốc gia" });
    }

    await cloudinary.v2.uploader.destroy(region.thumbnail.public_id);
    await cloudinary.v2.uploader.destroy(region.banner.public_id);

    const country: any = await Country.findById(region.countryId).select(
      "regions"
    );

    if (country) {
      const regionIndex = country.regions.findIndex((r: any) => {
        return r.toString() === id;
      });

      country.regions.splice(regionIndex, 1);
      country.save();
    }

    await region.deleteOne({ _id: id });

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

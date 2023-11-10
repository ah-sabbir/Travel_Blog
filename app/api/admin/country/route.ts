import cloudinary from "cloudinary";
import { CreateCountryInput } from "@/dtos/country/create-country.dto";
import { EditCountryInput } from "@/dtos/country/edit-country.dto";
import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Country from "@/models/Country";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body: CreateCountryInput = await req.json();

    const { name, slug, description, content, thumbnail } = body;

    if (!name || !slug || !description || !content) {
      return NextResponse.json({
        ok: false,
        error:
          "Thiếu tên, đường dẫn, mô tả hoặc thông tin vắn tắt của quốc gia",
      });
    }

    let savedThumbnail = { public_id: "", url: "" };
    const processedImage = await editCloudinaryImage(thumbnail);
    if (processedImage) {
      savedThumbnail = {
        public_id: processedImage.public_id,
        url: processedImage.secure_url,
      };
    }

    await dbConnect();

    await Country.create({
      name,
      slug,
      description,
      content,
      thumbnail: savedThumbnail,
    });

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

export async function PUT(req: Request) {
  try {
    const body: EditCountryInput = await req.json();

    const { name, slug, description, content, thumbnail, id } = body;

    if (!name || !slug || !description || !content || !id) {
      return NextResponse.json({
        ok: false,
        error:
          "Thiếu tên, đường dẫn, mô tả, id hoặc thông tin vắn tắt của quốc gia",
      });
    }

    await dbConnect();

    const country = await Country.findById(id);

    if (!country) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy quốc gia" });
    }

    const newThumbnail = await editCloudinaryImage(
      thumbnail,
      country.thumbnail
    );
    if (newThumbnail) {
      country.thumbnail = {
        public_id: newThumbnail.public_id,
        url: newThumbnail.secure_url,
      };
    }

    country.name = name;
    country.slug = slug;
    country.description = description;
    country.content = content;

    await country.save();

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
        error: "Thiếu tham số id của quốc gia",
      });
    }

    await dbConnect();

    const country = await Country.findById(id);

    if (!country) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy quốc gia" });
    }

    await cloudinary.v2.uploader.destroy(country.thumbnail.public_id);

    await Country.deleteOne({ _id: id });

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

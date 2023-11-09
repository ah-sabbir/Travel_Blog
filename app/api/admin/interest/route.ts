import cloudinary from "cloudinary";
import { CreateInterestInput } from "@/dtos/interest/create-interest.dto";
import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Interest from "@/models/Interest";
import { NextResponse } from "next/server";
import { EditInterestInput } from "@/dtos/interest/edit-interest.dto";

export async function POST(req: Request) {
  try {
    const body: CreateInterestInput = await req.json();

    const { name, slug, description, thumbnail } = body;

    if (!name || !slug || !description) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tên, đường dẫn, hoặc mô tả về sở thích",
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

    await Interest.create({
      name,
      slug,
      description,
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
    const body: EditInterestInput = await req.json();

    const { name, slug, description, thumbnail, id } = body;

    console.log(body);

    if (!name || !slug || !description || !id) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tên, đường dẫn, mô tả, hoặc id của sở thích",
      });
    }

    await dbConnect();

    const interest = await Interest.findById(id);

    if (!interest) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy sở thích" });
    }

    const newThumbnail = await editCloudinaryImage(
      thumbnail,
      interest.thumbnail
    );
    if (newThumbnail) {
      interest.thumbnail = {
        public_id: newThumbnail.public_id,
        url: newThumbnail.secure_url,
      };
    }

    interest.name = name;
    interest.slug = slug;
    interest.description = description;

    await interest.save();

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
        error: "Thiếu tham số id của sở thích",
      });
    }

    await dbConnect();

    const interest = await Interest.findById(id);

    if (!interest) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy sở thích" });
    }

    await cloudinary.v2.uploader.destroy(interest.thumbnail.public_id);

    await Interest.deleteOne({ _id: id });

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

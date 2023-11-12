import { CreateBrandTypeInput } from "@/dtos/brandType/create-brand-type.dto";
import { EditBrandTypeInput } from "@/dtos/brandType/edit-brand-type.dto";
import dbConnect from "@/lib/db";
import BrandType from "@/models/BrandType";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: CreateBrandTypeInput = await req.json();

    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tên hoặc đường dẫn của danh mục thương hiệu",
      });
    }

    await dbConnect();

    await BrandType.create({ name, slug });

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
    const body: EditBrandTypeInput = await req.json();

    const { name, slug, id } = body;

    if (!id || !name || !slug) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu id, tên hoặc đường dẫn của danh mục thương hiệu",
      });
    }

    await dbConnect();

    const brandCategory = await BrandType.findById(id);

    if (!brandCategory) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy danh mục thương hiệu",
      });
    }

    brandCategory.name = name;
    brandCategory.slug = slug;

    await brandCategory.save();

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
        error: "Thiếu tham số id của danh mục thương hiệu",
      });
    }

    await dbConnect();

    await BrandType.deleteOne({ _id: id });

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

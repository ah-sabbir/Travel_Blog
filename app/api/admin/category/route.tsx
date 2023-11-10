import { CreateCategoryInput } from "@/dtos/category/create-category.dto";
import { EditCategoryInput } from "@/dtos/category/edit-category.dto";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body: CreateCategoryInput = await req.json();

    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tên hoặc đường dẫn của danh mục",
      });
    }

    await dbConnect();

    await Category.create({ name, slug });

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
    const body: EditCategoryInput = await req.json();

    const { name, slug, id } = body;

    if (!id || !name || !slug) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu id, tên hoặc đường dẫn của danh mục",
      });
    }

    await dbConnect();

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy danh mục",
      });
    }

    category.name = name;
    category.slug = slug;

    await category.save();

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
        error: "Thiếu tham số id của danh mục",
      });
    }

    await dbConnect();

    await Category.findByIdAndDelete(id);

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

import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import Category from "@/models/Category";
import Gallery from "@/models/Gallery";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Thiếu tham số slug" });
    }

    await dbConnect();

    const category = await Category.findOne({ slug }).populate([
      {
        path: "articles",
        model: Article,
        select: "thumbnail name slug description updatedAt",
      },
      {
        path: "galleries",
        model: Gallery,
        select: "thumbnail name slug description updatedAt",
      },
    ]);

    if (!category) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy danh mục" });
    }

    return NextResponse.json({ ok: true, category });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import Country from "@/models/Country";
import Gallery from "@/models/Gallery";
import Interest from "@/models/Interest";
import Region from "@/models/Region";
import User from "@/models/User";
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

    const gallery = await Gallery.findOne({ slug }).populate([
      {
        path: "country",
        model: Country,
        select: "name slug",
      },
      {
        path: "region",
        model: Region,
        select: "name slug",
      },
      {
        path: "category",
        model: Category,
        select: "name slug",
      },
      {
        path: "interest",
        model: Interest,
        select: "name slug",
      },
      {
        path: "author",
        model: User,
        select: "name",
      },
    ]);

    if (!slug) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy thư viện ảnh",
      });
    }

    return NextResponse.json({ ok: true, gallery });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

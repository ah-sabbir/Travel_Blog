import dbConnect from "@/lib/db";
import Brand from "@/models/Brand";
import BrandType from "@/models/BrandType";
import Country from "@/models/Country";
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

    const brand = await Brand.findOne({ slug }).populate({
      path: "brandType",
      model: BrandType,
      select: "name slug",
    });

    if (!brand) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy thương hiệu",
      });
    }

    return NextResponse.json({ ok: true, brand });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

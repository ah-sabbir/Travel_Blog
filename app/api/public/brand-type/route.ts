import dbConnect from "@/lib/db";
import BrandType from "@/models/BrandType";
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

    const brandType = await BrandType.findOne({ slug });

    if (!brandType) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy loại thương hiệu",
      });
    }

    return NextResponse.json({ ok: true, brandType });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

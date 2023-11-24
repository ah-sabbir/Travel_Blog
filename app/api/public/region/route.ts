import dbConnect from "@/lib/db";
import Region from "@/models/Region";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const specifiedProps = searchParams.get("specifiedProps");

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Thiếu tham số slug" });
    }

    await dbConnect();

    const region = await Region.findOne({ slug }).select(specifiedProps || "");

    if (!slug) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy tỉnh / vùng miền",
      });
    }

    return NextResponse.json({ ok: true, region });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

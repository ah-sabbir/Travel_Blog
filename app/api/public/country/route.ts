import dbConnect from "@/lib/db";
import Country from "@/models/Country";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Thiếu tham số slug" });
    }

    await dbConnect();

    const country = await Country.findOne({ slug });

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy quốc gia" });
    }

    return NextResponse.json({ ok: true, country });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

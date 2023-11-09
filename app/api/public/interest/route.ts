import dbConnect from "@/lib/db";
import Interest from "@/models/Interest";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Thiếu tham số slug" });
    }

    await dbConnect();

    const interest = await Interest.findOne({ slug });

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy sở thích" });
    }

    return NextResponse.json({ ok: true, interest });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

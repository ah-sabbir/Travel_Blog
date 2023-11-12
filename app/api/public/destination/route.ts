import dbConnect from "@/lib/db";
import Destination from "@/models/Destination";
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

    const destination = await Destination.findOne({ slug });

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy bài viết" });
    }

    return NextResponse.json({ ok: true, destination });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

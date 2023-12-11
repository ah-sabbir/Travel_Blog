import dbConnect from "@/lib/db";
import Interest from "@/models/Interest";
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

    const interest = await Interest.findOne({ slug }).select(
      "name slug description thumbnail"
    );

    if (!interest) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy sở thích" });
    }

    return NextResponse.json({ ok: true, interest });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

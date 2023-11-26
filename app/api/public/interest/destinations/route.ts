import dbConnect from "@/lib/db";
import Country from "@/models/Country";
import Destination from "@/models/Destination";
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

    const interest = await Interest.findOne({ slug }).populate({
      model: Destination,
      path: "destinations",
      select: "name slug thumbnail country",
      populate: { path: "country", model: Country, select: "name" },
    });

    if (!interest) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy sở thích" });
    }

    return NextResponse.json({ ok: true, destinations: interest.destinations });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

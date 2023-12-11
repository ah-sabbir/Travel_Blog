import dbConnect from "@/lib/db";
import Region from "@/models/Region";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const countryId = searchParams.get("countryId");
    const regionId = searchParams.get("regionId");

    await dbConnect();

    let regions = await Region.find({
      countryId,
    }).select("name slug");

    if (regionId) {
      regions = regions.filter((region) => region._id.toString() !== regionId);
    }

    return NextResponse.json({ ok: true, regions });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

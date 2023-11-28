import dbConnect from "@/lib/db";
import Country from "@/models/Country";
import Destination from "@/models/Destination";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const regionId = searchParams.get("regionId");
    const currentId = searchParams.get("currentId");

    await dbConnect();

    const destinations = await Destination.find({
      region: regionId,
      _id: { $ne: currentId },
    })
      .select("name thumbnail slug")
      .populate({ path: "country", model: Country, select: "name" });

    return NextResponse.json({ ok: true, destinations });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

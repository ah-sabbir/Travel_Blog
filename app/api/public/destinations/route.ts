import dbConnect from "@/lib/db";
import Country from "@/models/Country";
import Destination from "@/models/Destination";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");
    const limit = searchParams.get("limit");
    const populate = searchParams.get("populate");
    const nestedProps = searchParams.get("nestedProps");

    await dbConnect();

    let destinations;
    if (!populate) {
      destinations = await Destination.find().select(specifiedProps || "");
    } else {
      destinations = await Destination.find()
        .select(specifiedProps || "")
        .limit(Number(limit) || 0)
        .populate({
          path: populate as string,
          model: Country,
          select: nestedProps,
        })
        .sort({ createdAt: 1 });
    }

    return NextResponse.json({ ok: true, destinations });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

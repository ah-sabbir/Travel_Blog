import dbConnect from "@/lib/db";
import Region from "@/models/Region";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");

    await dbConnect();

    const regions = await Region.find().select(specifiedProps || "");

    return NextResponse.json({ ok: true, regions });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

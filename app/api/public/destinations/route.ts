import dbConnect from "@/lib/db";
import Destination from "@/models/Destination";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");

    await dbConnect();

    const destinations = await Destination.find().select(specifiedProps || "");

    return NextResponse.json({ ok: true, destinations });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

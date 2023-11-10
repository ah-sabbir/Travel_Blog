import dbConnect from "@/lib/db";
import Interest from "@/models/Interest";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");

    await dbConnect();

    const interests = await Interest.find().select(specifiedProps || "");

    return NextResponse.json({ ok: true, interests });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

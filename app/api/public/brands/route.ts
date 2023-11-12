import dbConnect from "@/lib/db";
import Brand from "@/models/Brand";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");

    await dbConnect();

    const brands = await Brand.find().select(specifiedProps || "");

    return NextResponse.json({ ok: true, brands });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

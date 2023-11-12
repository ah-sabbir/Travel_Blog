import dbConnect from "@/lib/db";
import BrandType from "@/models/BrandType";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");

    await dbConnect();

    const brandTypes = await BrandType.find().select(specifiedProps || "");

    return NextResponse.json({ ok: true, brandTypes });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

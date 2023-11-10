import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");

    await dbConnect();

    const categories = await Category.find().select(specifiedProps || "");

    return NextResponse.json({ ok: true, categories });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

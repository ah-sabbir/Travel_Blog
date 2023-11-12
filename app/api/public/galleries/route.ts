import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import Gallery from "@/models/Gallery";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");

    await dbConnect();

    const galleries = await Gallery.find().select(specifiedProps || "");

    return NextResponse.json({ ok: true, galleries });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

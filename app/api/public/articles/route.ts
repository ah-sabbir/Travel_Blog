import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");

    await dbConnect();

    const articles = await Article.find().select(specifiedProps || "");

    return NextResponse.json({ ok: true, articles });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

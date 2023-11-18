import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    await dbConnect();
    const article = await Article.findOne({ slug });

    return NextResponse.json({ ok: true, article });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

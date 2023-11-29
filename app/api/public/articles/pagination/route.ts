import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const skip = (page - 1) * limit;

    await dbConnect();

    const numberOfResults = await Article.countDocuments();

    const articles = await Article.find()
      .select("name slug thumbnail description updatedAt")
      .skip(skip)
      .limit(limit)
      .populate({
        path: "author",
        model: User,
        select: "name",
      })
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(numberOfResults / 6);

    return NextResponse.json({ ok: true, articles, totalPages });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

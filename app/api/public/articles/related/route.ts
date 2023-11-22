import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import Category from "@/models/Category";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("categorySlug");

    await dbConnect();

    let fromIndex;

    const category: any = await Category.findOne(
      { slug: categorySlug },
      { articles: { $slice: [0, 3] } }
    )
      .populate({
        path: "articles",
        model: Article,
        select: "name thumbnail slug updatedAt description",
        populate: { path: "author", model: User, select: "name" },
      })
      .select("articles");

    return NextResponse.json({ ok: true, articles: category.articles });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

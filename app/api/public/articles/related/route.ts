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
    const currentId = searchParams.get("currentId");

    await dbConnect();

    const categoryArticles: any = await Category.findOne({
      slug: categorySlug,
    })
      .select("_id")
      .populate({ path: "articles", model: Article, select: "_id" });

    let fromIndex = 0;
    fromIndex = Math.floor(
      Math.random() * (categoryArticles.articles.length - 3 - 0)
    );

    let toIndex = 0;
    if (fromIndex < 0) {
      fromIndex = 0;
      toIndex = 3;
    } else {
      toIndex = fromIndex + 3;
    }

    const category: any = await Category.findOne(
      { slug: categorySlug },
      { articles: { $slice: [fromIndex, toIndex] } }
    )
      .populate({
        path: "articles",
        model: Article,
        select: "name thumbnail slug updatedAt description",
        populate: { path: "author", model: User, select: "name" },
      })
      .select("articles");

    const articles = category.articles;

    const relatedArticles = articles.filter(
      (article: any) => article._id.toString() !== currentId
    );

    return NextResponse.json({ ok: true, articles: relatedArticles });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

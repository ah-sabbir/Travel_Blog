import { CategoryEntity } from "@/entities/category.entity";
import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("categorySlug");
    const specifiedProps = searchParams.get("specifiedProps");
    const limit = searchParams.get("limit");

    await dbConnect();

    const category: CategoryEntity = await Category.findOne(
      { slug: categorySlug },
      { articles: { $slice: [0, Number(limit)] } }
    )
      .populate({ path: "articles", model: Article, select: specifiedProps })
      .select(specifiedProps || "")
      .limit(Number(limit) || 0);

    return NextResponse.json({ ok: true, articles: category.articles });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

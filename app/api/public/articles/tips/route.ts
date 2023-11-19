import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import Country from "@/models/Country";
import Region from "@/models/Region";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");
    const limit = searchParams.get("limit");
    const populate = searchParams.get("populate");
    const nestedProps = searchParams.get("nestedProps");

    await dbConnect();

    let articles;

    if (!populate) {
      articles = await Article.find().select(specifiedProps || "");
    } else {
      articles = await Article.find()
        .select(specifiedProps || "")
        .limit(Number(limit) || 0)
        .populate({
          path: populate as string,
          model: populate === "country" ? Country : Region,
          select: nestedProps,
        })
        .sort({ createdAt: -1 });
    }

    return NextResponse.json({ ok: true, articles });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

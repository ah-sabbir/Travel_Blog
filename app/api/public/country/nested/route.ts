import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import Country from "@/models/Country";
import Destination from "@/models/Destination";
import Gallery from "@/models/Gallery";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const specifiedProps = searchParams.get("specifiedProps");
    const populate = searchParams.get("populate");
    const nestedProps = searchParams.get("nestedProps");
    const nestedLimit = searchParams.get("nestedLimit");

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Thiếu tham số slug" });
    }

    await dbConnect();

    const country = await Country.findOne(
      {},
      {
        destinations: { $slice: [0, Number(nestedLimit)] },
        articles: { $slice: [0, Number(nestedLimit)] },
        galleries: { $slice: [0, Number(nestedLimit)] },
      }
    )
      .select(specifiedProps || "")
      .populate({
        path: populate as string,
        model:
          populate === "destinations"
            ? Destination
            : populate === "articles"
            ? Article
            : Gallery,
        select: nestedProps,
      })
      .sort({ createdAt: 1 });

    if (!country) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy quốc gia" });
    }

    return NextResponse.json({ ok: true, country });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

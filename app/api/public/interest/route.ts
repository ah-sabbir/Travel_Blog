import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import Destination from "@/models/Destination";
import Gallery from "@/models/Gallery";
import Interest from "@/models/Interest";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const specifiedProps = searchParams.get("specifiedProps");
    const populate = searchParams.get("populate");
    const nestedProps = searchParams.get("nestedProps");

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Thiếu tham số slug" });
    }

    await dbConnect();

    let interest;

    if (!populate) {
      interest = await Interest.findOne({ slug }).select(specifiedProps || "");
    } else {
      interest = await Interest.findOne({ slug })
        .select(specifiedProps || "")
        .populate({
          path: populate as string,
          model:
            populate === "articles"
              ? Article
              : populate === "gallereis"
              ? Gallery
              : Destination,
          select: nestedProps,
        });
    }

    if (!interest) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy sở thích" });
    }

    return NextResponse.json({ ok: true, interest });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

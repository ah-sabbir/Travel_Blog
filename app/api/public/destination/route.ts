import dbConnect from "@/lib/db";
import Country from "@/models/Country";
import Destination from "@/models/Destination";
import Interest from "@/models/Interest";
import Region from "@/models/Region";
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

    let destination;

    if (populate !== "true") {
      destination = await Destination.findOne({ slug }).select(
        specifiedProps || ""
      );
    } else {
      destination = await Destination.findOne({ slug })
        .select(specifiedProps || "")
        .populate([
          {
            path: "region",
            model: Region,
            select: nestedProps,
          },
          {
            path: "country",
            model: Country,
            select: nestedProps,
          },
          {
            path: "interest",
            model: Interest,
            select: nestedProps,
          },
        ])
        .sort({ createdAt: 1 });
    }

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy địa danh" });
    }

    return NextResponse.json({ ok: true, destination });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

import dbConnect from "@/lib/db";
import Gallery from "@/models/Gallery";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const regionId = searchParams.get("regionId");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const skip = (page - 1) * limit;

    let numberOfResults = await Gallery.countDocuments({
      region: regionId,
    });

    await dbConnect();

    let galleries = await Gallery.find({
      region: regionId,
    })
      .select("name slug description thumbnail updatedAt")
      .skip(skip)
      .limit(limit)
      .populate({
        path: "author",
        model: User,
        select: "name",
      })
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(numberOfResults / 6);

    return NextResponse.json({ ok: true, galleries, totalPages });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

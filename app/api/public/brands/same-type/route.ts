import dbConnect from "@/lib/db";
import Brand from "@/models/Brand";
import BrandType from "@/models/BrandType";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const brandId = searchParams.get("brandId");
    const brandTypeId = searchParams.get("brandTypeId");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const skip = (page - 1) * limit;

    await dbConnect();

    let numberOfResults = await Brand.countDocuments({
      brandType: brandTypeId,
    });

    await dbConnect();

    let brands = await Brand.find({
      brandType: brandTypeId,
    })
      .select("name slug logo description")
      .skip(skip)
      .limit(limit)
      .populate([
        {
          path: "brandType",
          model: BrandType,
          select: "name",
        },
      ])
      .sort({ createdAt: -1 });

    if (brandId) {
      brands = brands.filter((brand) => brand._id.toString() !== brandId);
      numberOfResults = numberOfResults - 1;
    }

    const totalPages = Math.ceil(numberOfResults / 6);

    return NextResponse.json({ ok: true, brands, totalPages });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

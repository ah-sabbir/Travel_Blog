import dbConnect from "@/lib/db";
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
    const nestedLimit = searchParams.get("nestedLimit");

    await dbConnect();

    let countries;

    if (!populate) {
      countries = await Country.find()
        .select(specifiedProps || "")
        .sort({ createdAt: 1 });
    } else {
      countries = await Country.find(
        {},
        { regions: { $slice: [0, Number(nestedLimit)] } }
      )
        .select(specifiedProps || "")
        .limit(Number(limit) || 0)
        .populate({
          path: populate as string,
          model: Region,
          select: nestedProps,
        })
        .sort({ createdAt: 1 });
    }

    return NextResponse.json({ ok: true, countries });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

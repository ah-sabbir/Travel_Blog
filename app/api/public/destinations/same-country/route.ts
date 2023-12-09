import dbConnect from "@/lib/db";
import Brand from "@/models/Brand";
import Country from "@/models/Country";
import Destination from "@/models/Destination";
import Region from "@/models/Region";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const destinationId = searchParams.get("destinationId");
    const countryId = searchParams.get("countryId");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const skip = (page - 1) * limit;

    await dbConnect();

    let numberOfResults = await Destination.countDocuments({
      country: countryId,
    });

    await dbConnect();

    let destinations = await Destination.find({
      country: countryId,
    })
      .select("name slug thumbnail")
      .skip(skip)
      .limit(limit)
      .populate([
        {
          path: "country",
          model: Country,
          select: "name",
        },
      ])
      .sort({ createdAt: -1 });

    if (destinationId) {
      destinations = destinations.filter(
        (destination) => destination._id.toString() !== destinationId
      );
      numberOfResults = numberOfResults - 1;
    }

    const totalPages = Math.ceil(numberOfResults / 8);

    return NextResponse.json({ ok: true, destinations, totalPages });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

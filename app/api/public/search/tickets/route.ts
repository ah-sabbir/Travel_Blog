import dbConnect from "@/lib/db";
import Brand from "@/models/Brand";
import Country from "@/models/Country";
import Gallery from "@/models/Gallery";
import Region from "@/models/Region";
import Ticket from "@/models/Ticket";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const skip = (page - 1) * limit;

    await dbConnect();

    const numberOfResults = await Ticket.countDocuments({
      $text: { $search: query as string },
    });

    const tickets = await Ticket.find({
      $text: { $search: query as string },
    })
      .select("name slug thumbnail description price")
      .skip(skip)
      .limit(limit)
      .populate([
        {
          path: "brand",
          model: Brand,
          select: "name",
        },
        {
          path: "country",
          model: Country,
          select: "name",
        },
        {
          path: "region",
          model: Region,
          select: "name",
        },
      ])
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(numberOfResults / 6);

    return NextResponse.json({
      ok: true,
      tickets,
      totalPages,
      numberOfResults,
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

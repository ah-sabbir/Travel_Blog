import dbConnect from "@/lib/db";
import Brand from "@/models/Brand";
import Country from "@/models/Country";
import Region from "@/models/Region";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ticketId = searchParams.get("ticketId");
    const brandId = searchParams.get("brandId");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const skip = (page - 1) * limit;

    await dbConnect();

    let numberOfResults = await Ticket.countDocuments({
      brand: brandId,
    });

    await dbConnect();

    let tickets = await Ticket.find({
      brand: brandId,
    })
      .select("name slug thumbnail price")
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

    if (ticketId) {
      tickets = tickets.filter((ticket) => ticket._id.toString() !== ticketId);
      numberOfResults = numberOfResults - 1;
    }

    const totalPages = Math.ceil(numberOfResults / 6);

    return NextResponse.json({ ok: true, tickets, totalPages });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

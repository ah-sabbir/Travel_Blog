import dbConnect from "@/lib/db";
import Brand from "@/models/Brand";
import Country from "@/models/Country";
import Region from "@/models/Region";
import Ticket from "@/models/Ticket";
import TicketType from "@/models/TicketType";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const populate = searchParams.get("populate");

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Thiếu tham số slug" });
    }

    await dbConnect();

    let ticket;
    if (populate === "false") {
      ticket = await Ticket.findOne({ slug });
    } else {
      ticket = await Ticket.findOne({ slug }).populate([
        {
          path: "region",
          model: Region,
          select: "name slug",
        },
        {
          path: "country",
          model: Country,
          select: "name slug",
        },
        {
          path: "brand",
          model: Brand,
          select: "name affLink logo",
        },
        {
          path: "ticketType",
          model: TicketType,
          select: "name slug",
        },
      ]);
    }

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy vé" });
    }

    return NextResponse.json({ ok: true, ticket });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

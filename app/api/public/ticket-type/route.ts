import dbConnect from "@/lib/db";
import TicketType from "@/models/TicketType";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Thiếu tham số slug" });
    }

    await dbConnect();

    const ticketType = await TicketType.findOne({ slug });

    if (!ticketType) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy loại vé" });
    }

    return NextResponse.json({ ok: true, ticketType });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

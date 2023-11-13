import dbConnect from "@/lib/db";
import Ticket from "@/models/Ticket";
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

    const ticket = await Ticket.findOne({ slug });

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy vé" });
    }

    return NextResponse.json({ ok: true, ticket });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

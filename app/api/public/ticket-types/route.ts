import dbConnect from "@/lib/db";
import TicketType from "@/models/TicketType";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");

    await dbConnect();

    const ticketTypes = await TicketType.find().select(specifiedProps || "");

    return NextResponse.json({ ok: true, ticketTypes });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

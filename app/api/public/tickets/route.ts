import dbConnect from "@/lib/db";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");

    await dbConnect();

    const tickets = await Ticket.find().select(specifiedProps || "");

    return NextResponse.json({ ok: true, tickets });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

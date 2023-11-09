import dbConnect from "@/lib/db";
import Country from "@/models/Country";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");

    await dbConnect();

    const countries = await Country.find().select(specifiedProps || "");

    return NextResponse.json({ ok: true, countries });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

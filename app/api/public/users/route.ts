import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    await dbConnect();

    const users = await User.find().select("name updatedAt");

    return NextResponse.json({ ok: true, users });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

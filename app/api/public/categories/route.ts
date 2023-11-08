import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const categories = await Category.find();

    return NextResponse.json({ ok: true, categories });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

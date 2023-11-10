import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const articles = await Article.find();

    return NextResponse.json({ ok: true, articles });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

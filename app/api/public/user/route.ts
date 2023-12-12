import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import slugify from "slugify";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    await dbConnect();

    const existedUsers = await User.find({}).select("-password");

    const user = existedUsers.find(
      (user) => slugify(user.name, { lower: true }) === slug
    );

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Không tìm thấy user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}

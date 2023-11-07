import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    await dbConnect();

    const existedUser = await User.findById(userId).select("-password");

    if (!existedUser) {
      return NextResponse.json(
        { ok: false, error: "Không tìm thấy user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, user: existedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}

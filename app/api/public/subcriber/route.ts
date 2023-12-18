import dbConnect from "@/lib/db";
import Subcriber from "@/models/Subscriber";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: { email: string } = await req.json();

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          ok: false,
          error: "Thiếu tên hoặc đường dẫn của danh mục",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const existedEmail = await Subcriber.findOne({ email });

    if (existedEmail) {
      return NextResponse.json(
        {
          ok: false,
          error: "Bạn đã đăng ký trước đó rồi!",
        },
        { status: 400 }
      );
    }

    await Subcriber.create({ email });

    return NextResponse.json(
      {
        ok: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

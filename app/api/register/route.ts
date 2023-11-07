import { CreateAccountInput } from "@/dtos/auth/create-account.dto";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { email, password, name }: CreateAccountInput = await req.json();

    await dbConnect();

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return NextResponse.json(
        { ok: false, error: "Email bị trùng với tài khoản khác" },
        { status: 500 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}

import { ChangePasswordInput } from "@/dtos/user/change-password.dto";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, currentPassword, newPassword }: ChangePasswordInput = body;

    if (!id || !currentPassword || !newPassword) {
      return NextResponse.json({
        ok: false,
        error:
          "Thiếu tham số: id, currentPassword, newPassword hoặc confirmationPassword",
      });
    }

    await dbConnect();

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy user" });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return NextResponse.json({
        ok: false,
        error: "Mật khẩu hiện tại không chính xác",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

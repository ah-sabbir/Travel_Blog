import { EditProfileInput } from "@/dtos/user/edit-profile.dto";
import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const newData: EditProfileInput = await req.json();
    const {
      id,
      email,
      name,
      avatar,
      description,
      facebook,
      linkedin,
      twitter,
      youtube,
    } = newData;

    if (!id || !email || !name) {
      return NextResponse.json(
        { ok: false, error: "Thiếu tham số cần thiết: id, email hoặc tên" },
        { status: 400 }
      );
    }

    await dbConnect();

    let user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Không tìm thấy user" },
        { status: 404 }
      );
    }

    const newImage = await editCloudinaryImage(avatar);
    if (newImage) {
      user.avatar = { public_id: newImage.public_id, url: newImage.secure_url };
    }

    user.email = email;
    user.name = name;
    user.description = description;
    user.facebook = facebook;
    user.linkedin = linkedin;
    user.twitter = twitter;
    user.youtube = youtube;

    await user.save();

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}

import { CreateTicketTypeInput } from "@/dtos/ticketType/create-ticket-type.dto";
import { EditTicketTypeInput } from "@/dtos/ticketType/edit-ticket-type.dto";
import dbConnect from "@/lib/db";
import BrandType from "@/models/BrandType";
import TicketType from "@/models/TicketType";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: CreateTicketTypeInput = await req.json();

    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tên hoặc đường dẫn của danh mục vé",
      });
    }

    await dbConnect();

    await TicketType.create({ name, slug });

    return NextResponse.json({
      ok: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body: EditTicketTypeInput = await req.json();

    const { name, slug, id } = body;

    if (!id || !name || !slug) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu id, tên hoặc đường dẫn của danh mục vé",
      });
    }

    await dbConnect();

    const ticketType = await TicketType.findById(id);

    if (!ticketType) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy danh mục vé",
      });
    }

    ticketType.name = name;
    ticketType.slug = slug;

    await ticketType.save();

    return NextResponse.json({
      ok: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số id của danh mục vé",
      });
    }

    await dbConnect();

    await TicketType.deleteOne({ _id: id });

    return NextResponse.json({
      ok: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message,
    });
  }
}

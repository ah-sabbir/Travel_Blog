import cloudinary from "cloudinary";
import { CreateTicketInput } from "@/dtos/ticket/create-ticket.dto";
import { EditTicketInput } from "@/dtos/ticket/edit-ticket.dto";
import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Brand from "@/models/Brand";
import Country from "@/models/Country";
import Region from "@/models/Region";
import Ticket from "@/models/Ticket";
import TicketType from "@/models/TicketType";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: CreateTicketInput = await req.json();

    const {
      name,
      slug,
      description,
      content,
      thumbnail,
      link,
      price,
      ticketTypeId,
      brandId,
      countryId,
      images,
      regionId,
    } = body;

    if (!name || !slug || !description || !content || !link || !price) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu thông tin cần thiết",
      });
    }

    let savedThumbnail = { public_id: "", url: "" };
    const processedImage = await editCloudinaryImage(thumbnail);
    if (processedImage) {
      savedThumbnail = {
        public_id: processedImage.public_id,
        url: processedImage.secure_url,
      };
    }

    const newImages = images?.map((image) => image.link);

    await dbConnect();

    const ticket = await Ticket.create({
      name,
      slug,
      description,
      content,
      price,
      link,
      country: countryId,
      ticketType: ticketTypeId,
      brand: brandId,
      region: regionId,
      thumbnail: savedThumbnail,
      images: newImages,
    });

    if (countryId) {
      const country: any = await Country.findById(countryId).select("tickets");

      country.tickets.push(ticket._id);

      country.save();
    }

    if (regionId) {
      const region: any = await Region.findById(regionId).select("tickets");

      region.tickets.push(ticket._id);

      region.save();
    }

    if (brandId) {
      const brand: any = await Brand.findById(brandId).select("tickets");

      brand.tickets.push(ticket._id);

      brand.save();
    }

    if (ticketTypeId) {
      const ticketType: any = await TicketType.findById(ticketTypeId).select(
        "tickets"
      );

      ticketType.tickets.push(ticket._id);

      ticketType.save();
    }

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
    const body: EditTicketInput = await req.json();

    const {
      name,
      slug,
      description,
      content,
      thumbnail,
      link,
      price,
      ticketTypeId,
      brandId,
      countryId,
      images,
      regionId,
      ticketId,
    } = body;

    if (
      !name ||
      !slug ||
      !description ||
      !content ||
      !link ||
      !price ||
      !ticketId
    ) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số cần thiết",
      });
    }

    await dbConnect();

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy vé" });
    }

    // Country
    const country: any = await Country.findById(
      ticket.country.toString()
    ).select("tickets");

    if (country) {
      const ticketIndex = country.tickets.findIndex((r: any) => {
        return r.toString() === ticketId;
      });

      country.tickets.splice(ticketIndex, 1);
      country.save();
    }

    const newCountry = await Country.findById(countryId).select("tickets");

    if (!newCountry) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy quốc gia",
      });
    } else {
      newCountry.tickets.push(ticketId);
      newCountry.save();
    }

    // Region
    const region: any = await Region.findById(ticket.region.toString()).select(
      "tickets"
    );

    if (region) {
      const ticketIndex = region.tickets.findIndex((r: any) => {
        return r.toString() === ticketId;
      });

      region.tickets.splice(ticketIndex, 1);
      region.save();
    }

    const newRegion = await Region.findById(regionId).select("tickets");

    if (!newRegion) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy tỉnh / vùng miền",
      });
    } else {
      newRegion.tickets.push(ticketId);
      newRegion.save();
    }

    // Brand
    const brand: any = await Brand.findById(ticket.brand.toString()).select(
      "tickets"
    );

    if (brand) {
      const ticketIndex = brand.tickets.findIndex((r: any) => {
        return r.toString() === ticketId;
      });

      brand.tickets.splice(ticketIndex, 1);
      brand.save();
    }

    const newBrand = await Brand.findById(brandId).select("tickets");

    if (!newBrand) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy hãng vé",
      });
    } else {
      newBrand.tickets.push(ticketId);
      newBrand.save();
    }

    // Ticket type
    const ticketType: any = await TicketType.findById(
      ticket.ticketType.toString()
    ).select("tickets");

    if (ticketType) {
      const ticketIndex = ticketType.tickets.findIndex((r: any) => {
        return r.toString() === ticketId;
      });

      ticketType.tickets.splice(ticketIndex, 1);
      ticketType.save();
    }

    const newTicketType = await TicketType.findById(ticketTypeId).select(
      "tickets"
    );

    if (!newTicketType) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy loại vé",
      });
    } else {
      newTicketType.tickets.push(ticketId);
      newTicketType.save();
    }

    const newThumbnail = await editCloudinaryImage(thumbnail, ticket.thumbnail);
    if (newThumbnail) {
      ticket.thumbnail = {
        public_id: newThumbnail.public_id,
        url: newThumbnail.secure_url,
      };
    }

    const newImages = images?.map((image) => image.link);

    ticket.name = name;
    ticket.slug = slug;
    ticket.description = description;
    ticket.link = link;
    ticket.price = price;
    ticket.content = content;
    ticket.brand = brandId;
    ticket.region = regionId;
    ticket.country = countryId;
    ticket.ticketType = ticketTypeId;
    ticket.images = newImages;

    await ticket.save();

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
        error: "Thiếu tham số id của vé",
      });
    }

    await dbConnect();

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy vé" });
    }

    await cloudinary.v2.uploader.destroy(ticket.thumbnail.public_id);

    // Country
    const country: any = await Country.findById(
      ticket.country.toString()
    ).select("tickets");

    if (country) {
      const destinationIndex = country.tickets.findIndex((r: any) => {
        return r.toString() === id;
      });

      country.tickets.splice(destinationIndex, 1);
      country.save();
    }

    // Region
    const region: any = await Region.findById(ticket.region.toString()).select(
      "tickets"
    );

    if (region) {
      const destinationIndex = region.tickets.findIndex((r: any) => {
        return r.toString() === id;
      });

      region.tickets.splice(destinationIndex, 1);
      region.save();
    }

    // Brand
    const brand: any = await Brand.findById(ticket.brand.toString()).select(
      "tickets"
    );

    if (brand) {
      const destinationIndex = brand.tickets.findIndex((r: any) => {
        return r.toString() === id;
      });

      brand.tickets.splice(destinationIndex, 1);
      brand.save();
    }

    // Ticket type
    const ticketType: any = await TicketType.findById(
      ticket.ticketType.toString()
    ).select("tickets");

    if (ticketType) {
      const destinationIndex = ticketType.tickets.findIndex((r: any) => {
        return r.toString() === id;
      });

      ticketType.tickets.splice(destinationIndex, 1);
      ticketType.save();
    }

    await Ticket.deleteOne({ _id: id });

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

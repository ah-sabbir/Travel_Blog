import { GalleryEntity } from "@/entities/gallery.entity";
import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import Gallery from "@/models/Gallery";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const countryId = searchParams.get("countryId");
    const currentId = searchParams.get("currentId");

    await dbConnect();

    const countryGalleries: any = await Gallery.find({ country: countryId })
      .select("_id")
      .populate({ path: "articles", model: Article, select: "_id" });

    const newCountryGalleries = countryGalleries.filter(
      (gallery: GalleryEntity) => gallery._id.toString() !== currentId
    );

    let a = Math.floor(Math.random() * (newCountryGalleries.length - 1));

    let b = a + 1;
    if (b > newCountryGalleries.length - 1) {
      b = a - 1;
    }

    let c = a + 2;
    if (c > newCountryGalleries.length - 2) {
      c = c - 2;
    }

    return NextResponse.json({
      ok: true,
      galleries: [
        ...(newCountryGalleries[a] && newCountryGalleries[a]),
        ...(newCountryGalleries[b] && newCountryGalleries[b]),
        ...(newCountryGalleries[c] && newCountryGalleries[c]),
      ],
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

import { GalleryEntity } from "@/entities/gallery.entity";
import dbConnect from "@/lib/db";
import Gallery from "@/models/Gallery";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const countryId = searchParams.get("countryId");
    const currentId = searchParams.get("currentId");

    await dbConnect();

    const countryGalleries: any = await Gallery.find({ country: countryId })
      .select("name thumbnail slug updatedAt description")
      .populate({ path: "author", model: User, select: "name" });

    const newCountryGalleries = countryGalleries.filter(
      (gallery: GalleryEntity) => gallery._id.toString() !== currentId
    );

    let a: number;
    let b: number;
    let c: number;

    if (newCountryGalleries.length > 3) {
      a = Math.floor(Math.random() * (newCountryGalleries.length - 1));
      b = Math.floor(Math.random() * (newCountryGalleries.length - 1));
      c = Math.floor(Math.random() * (newCountryGalleries.length - 1));

      while (a === b) {
        b = Math.floor(Math.random() * (newCountryGalleries.length - 1));
      }

      while (c === b || c === a) {
        c = Math.floor(Math.random() * (newCountryGalleries.length - 1));
      }
    } else {
      a = 0;
      b = 1;
      c = 2;
    }

    const galleries = [];
    if (newCountryGalleries[a]) galleries.push(newCountryGalleries[a]);
    if (newCountryGalleries[b]) galleries.push(newCountryGalleries[b]);
    if (newCountryGalleries[c]) galleries.push(newCountryGalleries[c]);

    return NextResponse.json({
      ok: true,
      galleries,
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}

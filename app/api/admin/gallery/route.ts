import cloudinary from "cloudinary";
import { CreateGalleryInput } from "@/dtos/gallery/create-gallery.dto";
import { EditGalleryInput } from "@/dtos/gallery/edit-gallery.dto";
import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import Country from "@/models/Country";
import Destination from "@/models/Destination";
import Gallery from "@/models/Gallery";
import Interest from "@/models/Interest";
import Region from "@/models/Region";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: CreateGalleryInput = await req.json();

    const {
      name,
      slug,
      description,
      content,
      thumbnail,
      authorId,
      categoryId,
      countryId,
      interestId,
      destinationId,
      regionId,
      imagesContent,
      credit,
    } = body;

    if (
      !name ||
      !slug ||
      !description ||
      !content ||
      !authorId ||
      !imagesContent
    ) {
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

    await dbConnect();

    const gallery = await Gallery.create({
      name,
      slug,
      description,
      content,
      imagesContent,
      credit,
      thumbnail: savedThumbnail,
      category: categoryId,
      country: countryId,
      interest: interestId,
      destination: destinationId,
      region: regionId,
      author: authorId,
    });

    const category = await Category.findById(categoryId).select("galleries");
    category.galleries.push(gallery._id);
    await category.save();

    const interest = await Interest.findById(interestId).select("galleries");
    interest.galleries.push(gallery._id);
    await interest.save();

    const country = await Country.findById(countryId).select("galleries");
    country.galleries.push(gallery._id);
    await country.save();

    const region = await Region.findById(regionId).select("galleries");
    region.galleries.push(gallery._id);
    await region.save();

    const destination = await Destination.findById(destinationId).select(
      "galleries"
    );
    destination.galleries.push(gallery._id);
    await destination.save();

    const user = await User.findById(authorId).select("galleries");
    user.galleries.push(gallery._id);
    await user.save();

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
    const body: EditGalleryInput = await req.json();

    const {
      name,
      slug,
      description,
      content,
      thumbnail,
      galleryId,
      imagesContent,
      credit,
      categoryId,
      countryId,
      interestId,
      destinationId,
      regionId,
    } = body;

    if (
      !name ||
      !slug ||
      !description ||
      !content ||
      !galleryId ||
      !imagesContent
    ) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số cần thiết",
      });
    }

    await dbConnect();

    const gallery = await Gallery.findById(galleryId);

    if (!gallery) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy gallery" });
    }

    // Country
    const country: any = await Country.findById(
      gallery.country.toString()
    ).select("galleries");

    if (country) {
      const galleryIndex = country.galleries.findIndex((r: any) => {
        return r.toString() === galleryId;
      });

      country.galleries.splice(galleryIndex, 1);
      country.save();
    }

    const newCountry = await Country.findById(countryId).select("galleries");

    if (!newCountry) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy quốc gia",
      });
    } else {
      newCountry.galleries.push(galleryId);
      newCountry.save();
    }

    // Interest
    const interest: any = await Interest.findById(
      gallery.interest.toString()
    ).select("galleries");

    if (interest) {
      const galleryIndex = interest.galleries.findIndex((r: any) => {
        return r.toString() === galleryId;
      });

      interest.galleries.splice(galleryIndex, 1);
      interest.save();
    }

    const newInterest = await Interest.findById(interestId).select("galleries");

    if (!newInterest) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy sở thích",
      });
    } else {
      newInterest.galleries.push(galleryId);
      newInterest.save();
    }

    // Region
    const region: any = await Region.findById(gallery.region.toString()).select(
      "galleries"
    );

    if (region) {
      const galleryIndex = region.galleries.findIndex((r: any) => {
        return r.toString() === galleryId;
      });

      region.galleries.splice(galleryIndex, 1);
      region.save();
    }

    const newRegion = await Region.findById(regionId).select("galleries");

    if (!newRegion) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy tỉnh / vùng miền",
      });
    } else {
      newRegion.galleries.push(galleryId);
      newRegion.save();
    }

    // Category
    const category: any = await Category.findById(gallery.category).select(
      "galleries"
    );

    if (category) {
      const galleryIndex = category.galleries.findIndex((r: any) => {
        return r.toString() === galleryId;
      });

      category.galleries.splice(galleryIndex, 1);
      category.save();
    }

    const newCategory = await Category.findById(categoryId).select("galleries");

    if (!newCategory) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy danh mục",
      });
    } else {
      newCategory.galleries.push(galleryId);
      newCategory.save();
    }

    // Destination
    const destination: any = await Destination.findById(
      gallery.destination.toString()
    ).select("galleries");

    if (destination) {
      const galleryIndex = destination.galleries.findIndex((r: any) => {
        return r.toString() === galleryId;
      });

      destination.galleries.splice(galleryIndex, 1);
      destination.save();
    }

    const newDestination = await Destination.findById(destinationId).select(
      "galleries"
    );

    if (!newDestination) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy địa danh",
      });
    } else {
      newDestination.galleries.push(galleryId);
      newDestination.save();
    }

    const newThumbnail = await editCloudinaryImage(
      thumbnail,
      gallery.thumbnail
    );
    if (newThumbnail) {
      gallery.thumbnail = {
        public_id: newThumbnail.public_id,
        url: newThumbnail.secure_url,
      };
    }

    gallery.name = name;
    gallery.slug = slug;
    gallery.description = description;
    gallery.credit = credit;
    gallery.imagesContent = imagesContent;
    gallery.content = content;
    gallery.interest = interestId;
    gallery.region = regionId;
    gallery.country = countryId;
    gallery.category = categoryId;
    gallery.destination = destinationId;

    await gallery.save();

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
        error: "Thiếu tham số id của gallery",
      });
    }

    await dbConnect();

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy gallery" });
    }

    await cloudinary.v2.uploader.destroy(gallery.thumbnail.public_id);

    // Country
    const country: any = await Country.findById(
      gallery.country.toString()
    ).select("galleries");

    if (country) {
      const galleryIndex = country.galleries.findIndex((r: any) => {
        return r.toString() === id;
      });

      country.galleries.splice(galleryIndex, 1);
      country.save();
    }

    // Interest
    const interest: any = await Interest.findById(
      gallery.interest.toString()
    ).select("galleries");

    if (interest) {
      const galleryIndex = interest.galleries.findIndex((r: any) => {
        return r.toString() === id;
      });

      interest.galleries.splice(galleryIndex, 1);
      interest.save();
    }

    // Category
    const category: any = await Category.findById(
      gallery.category.toString()
    ).select("galleries");

    if (category) {
      const galleryIndex = category.galleries.findIndex((r: any) => {
        return r.toString() === id;
      });

      category.galleries.splice(galleryIndex, 1);
      category.save();
    }

    // Region
    const region: any = await Region.findById(gallery.region.toString()).select(
      "galleries"
    );

    if (region) {
      const galleryIndex = region.galleries.findIndex((r: any) => {
        return r.toString() === id;
      });

      region.galleries.splice(galleryIndex, 1);
      region.save();
    }

    // Destination
    const destination: any = await Destination.findById(
      gallery.destination.toString()
    ).select("galleries");

    if (destination) {
      const galleryIndex = destination.galleries.findIndex((r: any) => {
        return r?.toString() === id;
      });

      destination.galleries.splice(galleryIndex, 1);
      destination.save();
    }

    // User
    const user: any = await User.findById(gallery.author.toString()).select(
      "galleries"
    );

    if (user) {
      const galleryIndex = user.galleries.findIndex((r: any) => {
        return r.toString() === id;
      });

      user.galleries.splice(galleryIndex, 1);
      user.save();
    }

    await Gallery.deleteOne({ _id: id });

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

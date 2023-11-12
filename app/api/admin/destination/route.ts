import cloudinary from "cloudinary";
import { CreateDestinationInput } from "@/dtos/destination/create-destination.dto";
import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Country from "@/models/Country";
import Destination from "@/models/Destination";
import Interest from "@/models/Interest";
import Region from "@/models/Region";
import { NextResponse } from "next/server";
import { EditDestinationInput } from "@/dtos/destination/edit-destination.dto";

export async function POST(req: Request) {
  try {
    const body: CreateDestinationInput = await req.json();

    const {
      name,
      slug,
      description,
      content,
      thumbnail,
      address,
      countryId,
      images,
      instruction,
      regionId,
      interestId,
    } = body;

    if (!name || !slug || !description || !content || !address) {
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

    const destination = await Destination.create({
      name,
      slug,
      description,
      content,
      address,
      instruction,
      country: countryId,
      region: regionId,
      interest: interestId,
      thumbnail: savedThumbnail,
      images: newImages,
    });

    if (countryId) {
      const country: any = await Country.findById(countryId).select(
        "destinations"
      );

      country.destinations.push(destination._id);

      country.save();
    }

    if (regionId) {
      const region: any = await Region.findById(regionId).select(
        "destinations"
      );

      region.destinations.push(destination._id);

      region.save();
    }

    if (interestId) {
      const interest: any = await Interest.findById(interestId).select(
        "destinations"
      );

      interest.destinations.push(destination._id);

      interest.save();
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
    const body: EditDestinationInput = await req.json();

    const {
      name,
      slug,
      description,
      content,
      thumbnail,
      address,
      images,
      instruction,
      countryId,
      interestId,
      destinationId,
      regionId,
    } = body;

    if (!name || !slug || !description || !content || !destinationId) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số cần thiết",
      });
    }

    await dbConnect();

    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy địa danh" });
    }

    // Country
    const country: any = await Country.findById(
      destination.country.toString()
    ).select("destinations");

    if (country) {
      const destinationIndex = country.destinations.findIndex((r: any) => {
        return r.toString() === destinationId;
      });

      country.destinations.splice(destinationIndex, 1);
      country.save();
    }

    const newCountry = await Country.findById(countryId).select("destinations");

    if (!newCountry) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy quốc gia",
      });
    } else {
      newCountry.destinations.push(destinationId);
      newCountry.save();
    }

    // Interest
    const interest: any = await Interest.findById(
      destination.interest.toString()
    ).select("destinations");

    if (interest) {
      const destinationIndex = interest.destinations.findIndex((r: any) => {
        return r.toString() === destinationId;
      });

      interest.destinations.splice(destinationIndex, 1);
      interest.save();
    }

    const newInterest = await Interest.findById(interestId).select(
      "destinations"
    );

    if (!newInterest) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy sở thích",
      });
    } else {
      newInterest.destinations.push(destinationId);
      newInterest.save();
    }

    // Region
    const region: any = await Region.findById(
      destination.region.toString()
    ).select("destinations");

    if (region) {
      const destinationIndex = region.destinations.findIndex((r: any) => {
        return r.toString() === destinationId;
      });

      region.destinations.splice(destinationIndex, 1);
      region.save();
    }

    const newRegion = await Region.findById(regionId).select("destinations");

    if (!newRegion) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy tỉnh / vùng miền",
      });
    } else {
      newRegion.destinations.push(destinationId);
      newRegion.save();
    }

    const newThumbnail = await editCloudinaryImage(
      thumbnail,
      destination.thumbnail
    );
    if (newThumbnail) {
      destination.thumbnail = {
        public_id: newThumbnail.public_id,
        url: newThumbnail.secure_url,
      };
    }

    const newImages = images?.map((image) => image.link);

    destination.name = name;
    destination.slug = slug;
    destination.description = description;
    destination.content = content;
    destination.interest = interestId;
    destination.region = regionId;
    destination.country = countryId;
    destination.address = address;
    destination.instruction = instruction;
    destination.images = newImages;

    await destination.save();

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
        error: "Thiếu tham số id của địa danh",
      });
    }

    await dbConnect();

    const destination = await Destination.findById(id);

    if (!destination) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy địa danh" });
    }

    await cloudinary.v2.uploader.destroy(destination.thumbnail.public_id);

    // Country
    const country: any = await Country.findById(
      destination.country.toString()
    ).select("destinations");

    if (country) {
      const destinationIndex = country.destinations.findIndex((r: any) => {
        return r.toString() === id;
      });

      country.destinations.splice(destinationIndex, 1);
      country.save();
    }

    // Interest
    const interest: any = await Interest.findById(
      destination.interest.toString()
    ).select("destinations");

    if (interest) {
      const destinationIndex = interest.destinations.findIndex((r: any) => {
        return r.toString() === id;
      });

      interest.destinations.splice(destinationIndex, 1);
      interest.save();
    }

    // Region
    const region: any = await Region.findById(
      destination.region.toString()
    ).select("destinations");

    if (region) {
      const destinationIndex = region.destinations.findIndex((r: any) => {
        return r.toString() === id;
      });

      region.destinations.splice(destinationIndex, 1);
      region.save();
    }

    await Destination.deleteOne({ _id: id });

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

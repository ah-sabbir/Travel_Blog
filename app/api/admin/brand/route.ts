import cloudinary from "cloudinary";
import { CreateBrandInput } from "@/dtos/brand/create-brand.dto";
import { EditBrandInput } from "@/dtos/brand/edit-brand.dto";
import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Brand from "@/models/Brand";
import BrandType from "@/models/BrandType";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: CreateBrandInput = await req.json();

    const {
      name,
      slug,
      description,
      content,
      logo,
      affLink,
      link,
      brandTypeId,
    } = body;

    if (!name || !slug || !link || !description || !content) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu thông tin cần thiết",
      });
    }

    let savedLogo = { public_id: "", url: "" };
    const processedImage = await editCloudinaryImage(logo);
    if (processedImage) {
      savedLogo = {
        public_id: processedImage.public_id,
        url: processedImage.secure_url,
      };
    }

    await dbConnect();

    const brand = await Brand.create({
      name,
      slug,
      description,
      content,
      logo: savedLogo,
      affLink,
      link,
      brandType: brandTypeId,
    });

    const brandType = await BrandType.findById(brandTypeId).select("brands");

    if (brandType) {
      brandType.brands.push(brand._id.toString());
      brandType.save();
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
    const body: EditBrandInput = await req.json();

    const {
      name,
      slug,
      description,
      content,
      affLink,
      link,
      logo,
      brandTypeId,
      brandId,
    } = body;

    if (!name || !slug || !description || !content || !link || !brandId) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu thông tin cần thiết",
      });
    }

    await dbConnect();

    const brand = await Brand.findById(brandId);

    if (!brand) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy thương hiệu",
      });
    }

    const brandType: any = await BrandType.findById(
      brand.brandType.toString()
    ).select("brands");

    if (brandType) {
      const brandIndex = brandType.brands.findIndex((r: any) => {
        return r.toString() === brandId;
      });

      brandType.brands.splice(brandIndex, 1);
      brandType.save();
    }

    const newBrandType = await BrandType.findById(brandTypeId).select("brands");

    if (!newBrandType) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy danh mục thương hiệu mới",
      });
    } else {
      newBrandType.brands.push(brandId);
      newBrandType.save();
    }

    const newLogo = await editCloudinaryImage(logo, brand.logo);
    if (newLogo) {
      brand.logo = {
        public_id: newLogo.public_id,
        url: newLogo.secure_url,
      };
    }

    brand.name = name;
    brand.slug = slug;
    brand.description = description;
    brand.content = content;
    brand.affLink = affLink;
    brand.link = link;
    brand.brandType = brandTypeId;
    brandTypeId;

    await brand.save();

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
        error: "Thiếu tham số id của thương hiệu",
      });
    }

    await dbConnect();

    const brand = await Brand.findById(id);

    if (!brand) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy thương hiệu",
      });
    }

    await cloudinary.v2.uploader.destroy(brand.logo.public_id);

    const brandType: any = await BrandType.findById(brand.brandType).select(
      "brands"
    );

    if (brandType) {
      const brandIndex = brandType.brands.findIndex((r: any) => {
        return r.toString() === id;
      });

      brandType.brands.splice(brandIndex, 1);
      brandType.save();
    }

    await Brand.deleteOne({ _id: id });

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

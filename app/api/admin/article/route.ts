import cloudinary from "cloudinary";
import { CreateArticleInput } from "@/dtos/article/create-article.dto";
import { EditArticleInput } from "@/dtos/article/edit-article.dto";
import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import Category from "@/models/Category";
import Country from "@/models/Country";
import Interest from "@/models/Interest";
import Region from "@/models/Region";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Destination from "@/models/Destination";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body: CreateArticleInput = await req.json();

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
    } = body;

    if (!name || !slug || !description || !content || !authorId) {
      return NextResponse.json({
        ok: false,
        error:
          "Thiếu tên, đường dẫn, mô tả, nội dung hoặc tác giả của bài viết",
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

    const article = await Article.create({
      name,
      slug,
      description,
      content,
      thumbnail: savedThumbnail,
      category: categoryId,
      country: countryId,
      interest: interestId,
      destination: destinationId,
      region: regionId,
      author: authorId,
    });

    const category = await Category.findById(categoryId).select("articles");
    category.articles.push(article._id);
    await category.save();

    if (interestId) {
      const interest = await Interest.findById(interestId).select("articles");
      interest.articles.push(article._id);
      await interest.save();
    }

    if (countryId) {
      const country = await Country.findById(countryId).select("articles");
      country.articles.push(article._id);
      await country.save();
    }

    if (regionId) {
      const region = await Region.findById(regionId).select("articles");
      region.articles.push(article._id);
      await region.save();
    }

    if (destinationId) {
      const destination = await Destination.findById(destinationId).select(
        "articles"
      );
      destination.articles.push(article._id);
      await destination.save();
    }

    const user = await User.findById(authorId).select("articles");
    user.articles.push(article._id);
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
    const body: EditArticleInput = await req.json();

    const {
      name,
      slug,
      description,
      content,
      thumbnail,
      articleId,
      categoryId,
      countryId,
      interestId,
      destinationId,
      regionId,
    } = body;

    if (!name || !slug || !description || !content || !articleId) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số cần thiết",
      });
    }

    await dbConnect();

    const article = await Article.findById(articleId);

    if (!article) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy bài viết" });
    }

    // Country
    const country: any = await Country.findById(
      article.country.toString()
    ).select("articles");

    if (country) {
      const articleIndex = country.articles.findIndex((r: any) => {
        return r.toString() === articleId;
      });

      country.articles.splice(articleIndex, 1);
      country.save();
    }

    const newCountry = await Country.findById(countryId).select("articles");

    if (!newCountry) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy quốc gia",
      });
    } else {
      newCountry.articles.push(articleId);
      newCountry.save();
    }

    // Interest
    const interest: any = await Interest.findById(
      article.interest.toString()
    ).select("articles");

    if (interest) {
      const articleIndex = interest.articles.findIndex((r: any) => {
        return r.toString() === articleId;
      });

      interest.articles.splice(articleIndex, 1);
      interest.save();
    }

    const newInterest = await Interest.findById(interestId).select("articles");

    if (!newInterest) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy sở thích",
      });
    } else {
      newInterest.articles.push(articleId);
      newInterest.save();
    }

    // Region
    const region: any = await Region.findById(article.region.toString()).select(
      "articles"
    );

    if (region) {
      const articleIndex = region.articles.findIndex((r: any) => {
        return r.toString() === articleId;
      });

      region.articles.splice(articleIndex, 1);
      region.save();
    }

    const newRegion = await Region.findById(regionId).select("articles");

    if (!newRegion) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy sở thích",
      });
    } else {
      newRegion.articles.push(articleId);
      newRegion.save();
    }

    // Category
    const category: any = await Category.findById(article.category).select(
      "articles"
    );

    if (category) {
      const articleIndex = category.articles.findIndex((r: any) => {
        return r.toString() === articleId;
      });

      category.articles.splice(articleIndex, 1);
      category.save();
    }

    const newCategory = await Category.findById(categoryId).select("articles");

    if (!newCategory) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy danh mục",
      });
    } else {
      newCategory.articles.push(articleId);
      newCategory.save();
    }

    const newThumbnail = await editCloudinaryImage(
      thumbnail,
      article.thumbnail
    );
    if (newThumbnail) {
      article.thumbnail = {
        public_id: newThumbnail.public_id,
        url: newThumbnail.secure_url,
      };
    }

    // Destination
    const destination: any = await Destination.findById(
      article.destination.toString()
    ).select("articles");

    if (destination) {
      const articleIndex = destination.articles.findIndex((r: any) => {
        return r.toString() === articleId;
      });

      destination.articles.splice(articleIndex, 1);
      destination.save();
    }

    const newDestination = await Destination.findById(destinationId).select(
      "articles"
    );

    if (!newDestination) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy địa danh",
      });
    } else {
      newDestination.articles.push(articleId);
      newDestination.save();
    }

    article.name = name;
    article.slug = slug;
    article.description = description;
    article.content = content;
    article.interest = interestId;
    article.region = regionId;
    article.country = countryId;
    article.category = categoryId;
    article.destination = destinationId;

    await article.save();

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
        error: "Thiếu tham số id của bài viết",
      });
    }

    await dbConnect();

    const article = await Article.findById(id);

    if (!article) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy bài viết" });
    }

    await cloudinary.v2.uploader.destroy(article.thumbnail.public_id);

    // Country
    const country: any = await Country.findById(
      article.country.toString()
    ).select("articles");

    if (country) {
      const articleIndex = country.articles.findIndex((r: any) => {
        return r.toString() === id;
      });

      country.articles.splice(articleIndex, 1);
      country.save();
    }

    // Interest
    const interest: any = await Interest.findById(
      article.interest.toString()
    ).select("articles");

    if (interest) {
      const articleIndex = interest.articles.findIndex((r: any) => {
        return r.toString() === id;
      });

      interest.articles.splice(articleIndex, 1);
      interest.save();
    }

    // Category
    const category: any = await Category.findById(
      article.category.toString()
    ).select("articles");

    if (category) {
      const articleIndex = category.articles.findIndex((r: any) => {
        return r.toString() === id;
      });

      category.articles.splice(articleIndex, 1);
      category.save();
    }

    // Region
    const region: any = await Region.findById(article.region.toString()).select(
      "articles"
    );

    if (region) {
      const articleIndex = region.articles.findIndex((r: any) => {
        return r.toString() === id;
      });

      region.articles.splice(articleIndex, 1);
      region.save();
    }

    // Destination
    const destination: any = await Destination.findById(
      article.destination.toString()
    ).select("articles");

    if (destination) {
      const articleIndex = destination.articles.findIndex((r: any) => {
        return r?.toString() === id;
      });

      destination.articles.splice(articleIndex, 1);
      destination.save();
    }

    // User
    const user: any = await User.findById(article.author.toString()).select(
      "articles"
    );

    if (user) {
      const articleIndex = user.articles.findIndex((r: any) => {
        return r.toString() === id;
      });

      user.articles.splice(articleIndex, 1);
      user.save();
    }

    await Article.deleteOne({ _id: id });

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

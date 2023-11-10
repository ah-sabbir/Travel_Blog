import { CreateArticleInput } from "@/dtos/article/create-article.dto";
import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import Category from "@/models/Category";
import Country from "@/models/Country";
import Interest from "@/models/Interest";
import Region from "@/models/Region";
import User from "@/models/User";
import { NextResponse } from "next/server";

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
      coutry: countryId,
      interest: interestId,
      region: regionId,
      author: authorId,
    });

    const category = await Category.findById(categoryId).select("articles");
    category.articles.push(article._id);
    await category.save();

    const interest = await Interest.findById(interestId).select("articles");
    interest.articles.push(article._id);
    await interest.save();

    const country = await Country.findById(countryId).select("articles");
    country.articles.push(article._id);
    await country.save();

    const region = await Region.findById(regionId).select("articles");
    region.articles.push(article._id);
    await region.save();

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

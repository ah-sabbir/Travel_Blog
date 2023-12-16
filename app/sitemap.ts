import { path } from "@/constant";
import dbConnect from "@/lib/db";
import { getAllArticles } from "@/lib/fetch-article-data";
import { getAllCategories } from "@/lib/fetch-category-data";
import { MetadataRoute } from "next";

type ObjectArr = { url: string; lastModified: Date }[];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;

  dbConnect();
  //   Fetch về các Dynamic Post
  const articles = await getAllArticles("slug updatedAt");

  const articleLinks = articles?.map((article) => ({
    url: `${baseURL}${path.article}${article.slug}`,
    lastModified: new Date(article.updatedAt),
  })) as ObjectArr;

  //   Fetch về các Dynamic Category
  const categories = await getAllCategories("slug updatedAt");

  const categoryLinks = categories?.map((category) => ({
    url: `${baseURL}${path.category}${category.slug}`,
    lastModified: new Date(),
  })) as ObjectArr;

  return [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/en`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/vi`,
      lastModified: new Date(),
    },
    ...articleLinks,
    ...categoryLinks,
  ];
}

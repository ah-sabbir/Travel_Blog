import { GetAllArticleOutput } from "@/dtos/article/get-all-articles.dto";
import axiosInstance from "./axios";
import { GetArticleBySlugOutput } from "@/dtos/article/get-article-by-slug.dto";

export const getAllArticles = async (
  specifiedProps: string = "",
  limit: string = "",
  populate: string = "",
  nestedProps: string = ""
) => {
  try {
    const { data }: { data: GetAllArticleOutput } = await axiosInstance(
      "/api/public/articles",
      {
        params: { specifiedProps, limit, populate, nestedProps },
      }
    );

    return data.articles;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getArticleBySlug = async (slug: string) => {
  try {
    const { data }: { data: GetArticleBySlugOutput } = await axiosInstance(
      `/api/public/article?slug=${slug}`
    );

    return data.article;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

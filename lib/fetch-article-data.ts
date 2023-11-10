import { GetAllArticleOutput } from "@/dtos/article/get-all-articles.dto";
import axiosInstance from "./axios";
import { GetArticleBySlugOutput } from "@/dtos/article/get-article-by-slug.dto";

export const getAllArticles = async (specifiedProps: string = "") => {
  try {
    const { data }: { data: GetAllArticleOutput } = await axiosInstance(
      "/api/public/articles",
      { params: { specifiedProps } }
    );

    return data.articles;
  } catch (err: any) {
    console.log(err.response.statusText);
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
    console.log(err.response.statusText);
    return;
  }
};

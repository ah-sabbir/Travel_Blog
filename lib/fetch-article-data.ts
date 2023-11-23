import { GetAllArticlesOutput } from "@/dtos/article/get-all-articles.dto";
import axiosInstance from "./axios";
import { GetArticleBySlugOutput } from "@/dtos/article/get-article-by-slug.dto";
import { GetRelatedArticlesOutput } from "@/dtos/article/get-related-articles.dto";

export const getAllArticles = async (
  specifiedProps: string = "",
  limit: string = "",
  populate: string = "",
  nestedProps: string = ""
) => {
  try {
    const { data }: { data: GetAllArticlesOutput } = await axiosInstance(
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

export const getArticlesByCategory = async (
  categorySlug: string,
  specifiedProps: string = "",
  limit: string = ""
) => {
  try {
    const { data }: { data: GetAllArticlesOutput } = await axiosInstance(
      `/api/public/articles/tips`,
      {
        params: { categorySlug, specifiedProps, limit },
      }
    );

    return data.articles;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getRelatedArticles = async (slug: string, currentId: string) => {
  try {
    const { data }: { data: GetRelatedArticlesOutput } = await axiosInstance(
      `/api/public/articles/related?categorySlug=${slug}&currentId=${currentId}`
    );

    return data.articles;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

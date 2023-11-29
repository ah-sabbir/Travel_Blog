import { GetAllArticlesOutput } from "@/dtos/article/get-all-articles.dto";
import axiosInstance from "./axios";
import { GetArticleBySlugOutput } from "@/dtos/article/get-article-by-slug.dto";
import { GetRelatedArticlesOutput } from "@/dtos/article/get-related-articles.dto";
import { GetArticleResultsOutput } from "@/dtos/article/get-article-results.dto";

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

export const getSearchResults = async (
  query: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetArticleResultsOutput } = await axiosInstance(
      `/api/public/search/articles`,
      {
        params: { query, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getArticlesOfDestination = async (
  destinationId: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetArticleResultsOutput } = await axiosInstance(
      `/api/public/destination/articles`,
      {
        params: { destinationId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getArticlesOfCountry = async (
  countryId: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetArticleResultsOutput } = await axiosInstance(
      `/api/public/country/articles`,
      {
        params: { countryId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getArticlesOfCategory = async (
  categoryId: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetArticleResultsOutput } = await axiosInstance(
      `/api/public/category/articles`,
      {
        params: { categoryId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getArticlesOfInterest = async (
  interestId: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetArticleResultsOutput } = await axiosInstance(
      `/api/public/interest/articles`,
      {
        params: { interestId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getArticlesOfRegion = async (
  regionId: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetArticleResultsOutput } = await axiosInstance(
      `/api/public/region/articles`,
      {
        params: { regionId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

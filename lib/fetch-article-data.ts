import { GetAllArticleOutput } from "@/dtos/article/get-all-articles.dto";
import axiosInstance from "./axios";

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

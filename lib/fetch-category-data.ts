import { GetAllCategoriesOutput } from "@/dtos/category/get-all-categories.dto";
import axiosInstance from "./axios";
import { GetCategoryBySlugOutput } from "@/dtos/category/get-category-by-slug.dto";

export const getAllCategories = async (
  specifiedProps: string = "",
  limit: string = ""
) => {
  try {
    const { data }: { data: GetAllCategoriesOutput } = await axiosInstance(
      "/api/public/categories",
      { params: { specifiedProps, limit } }
    );

    return data.categories;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getCategoryBySlug = async (slug: string) => {
  try {
    const { data }: { data: GetCategoryBySlugOutput } = await axiosInstance(
      `/api/public/category?slug=${slug}`
    );

    return data.category;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

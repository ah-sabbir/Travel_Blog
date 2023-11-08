import { GetAllCategoriesOutput } from "@/dtos/category/get-all-categories.dto";
import axiosInstance from "./axios";

export const getAllCategories = async () => {
  try {
    const { data }: { data: GetAllCategoriesOutput } = await axiosInstance(
      "/api/public/categories"
    );

    return data.categories;
  } catch (err: any) {
    console.log(err.response.statusText);
    return;
  }
};

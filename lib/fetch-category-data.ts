import { GetAllCategoriesOutput } from "@/dtos/category/get-all-categories.dto";
import axiosInstance from "./axios";

export const getAllCategories = async () => {
  const { data }: { data: GetAllCategoriesOutput } = await axiosInstance.get(
    "/api/public/categories"
  );

  return data;
};

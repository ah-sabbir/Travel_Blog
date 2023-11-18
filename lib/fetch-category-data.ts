import { GetAllCategoriesOutput } from "@/dtos/category/get-all-categories.dto";
import axiosInstance from "./axios";

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

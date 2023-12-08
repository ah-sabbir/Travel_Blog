import { GetBrandTypeBySlugOutput } from "@/dtos/brandType/get-brand-type-by-slug.dto";
import axiosInstance from "./axios";
import { GetAllBrandTypesOutput } from "@/dtos/brandType/get-all-brand-types.dto";

export const getAllBrandTypes = async (specifiedProps: string = "") => {
  try {
    const { data }: { data: GetAllBrandTypesOutput } = await axiosInstance(
      "/api/public/brand-types",
      { params: { specifiedProps } }
    );

    return data.brandTypes;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getBrandTypeBySlug = async (slug: string) => {
  try {
    const { data }: { data: GetBrandTypeBySlugOutput } = await axiosInstance(
      `/api/public/brand-type?slug=${slug}`
    );

    return data.brandType;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

import { GetAllBrandsOutput } from "@/dtos/brand/get-all-brands.dto";
import axiosInstance from "./axios";
import { GetBrandBySlugOutput } from "@/dtos/brand/get-brand-by-slug.dto";
import { GetBrandResultsOutput } from "@/dtos/brand/get-brand-results.dto";

export const getAllBrands = async (specifiedProps: string = "") => {
  try {
    const { data }: { data: GetAllBrandsOutput } = await axiosInstance(
      "/api/public/brands",
      { params: { specifiedProps } }
    );

    return data.brands;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getBrandBySlug = async (slug: string) => {
  try {
    const { data }: { data: GetBrandBySlugOutput } = await axiosInstance(
      `/api/public/brand?slug=${slug}`
    );

    return data.brand;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameTypeBrands = async (
  brandId: string = "",
  brandTypeId: string = "",
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetBrandResultsOutput } = await axiosInstance(
      `/api/public/brands/same-type`,
      {
        params: { brandId, brandTypeId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

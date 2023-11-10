import { GetAllRegionsOutput } from "@/dtos/region/get-all-regions.dto";
import axiosInstance from "./axios";
import { GetRegionBySlugOutput } from "@/dtos/region/get-region-by-slug.dto";

export const getAllRegions = async (specifiedProps: string = "") => {
  try {
    const { data }: { data: GetAllRegionsOutput } = await axiosInstance(
      "/api/public/regions",
      { params: { specifiedProps } }
    );

    return data.regions;
  } catch (err: any) {
    console.log(err.response.statusText);
    return;
  }
};

export const getRegionBySlug = async (slug: string) => {
  try {
    const { data }: { data: GetRegionBySlugOutput } = await axiosInstance(
      `/api/public/region?slug=${slug}`
    );

    return data.region;
  } catch (err: any) {
    console.log(err.response.statusText);
    return;
  }
};
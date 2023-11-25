import { GetAllRegionsOutput } from "@/dtos/region/get-all-regions.dto";
import axiosInstance from "./axios";
import { GetRegionBySlugOutput } from "@/dtos/region/get-region-by-slug.dto";
import { getNestedDataOfRegionOutput } from "@/dtos/region/get-nested-data-of-region";

export const getAllRegions = async (
  specifiedProps: string = "",
  limit: string = ""
) => {
  try {
    const { data }: { data: GetAllRegionsOutput } = await axiosInstance(
      "/api/public/regions",
      { params: { specifiedProps, limit } }
    );

    return data.regions;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getRegionBySlug = async (
  slug: string,
  specifiedProps: string = ""
) => {
  try {
    const { data }: { data: GetRegionBySlugOutput } = await axiosInstance(
      `/api/public/region?slug=${slug}`,
      { params: { specifiedProps } }
    );

    return data.region;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getNestedDataOfRegion = async (
  slug: string,
  specifiedProps: string = "",
  populate: string = "",
  nestedProps: string = "",
  nestedLimit: string = ""
) => {
  try {
    const { data }: { data: getNestedDataOfRegionOutput } = await axiosInstance(
      `/api/public/region/nested?slug=${slug}`,
      {
        params: {
          specifiedProps,
          populate,
          nestedProps,
          nestedLimit,
        },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

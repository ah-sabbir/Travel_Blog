import { GetAllRegionsOutput } from "@/dtos/region/get-all-regions.dto";
import axiosInstance from "./axios";

export const getAllRegions = async () => {
  try {
    const { data }: { data: GetAllRegionsOutput } = await axiosInstance(
      "/api/public/regions"
    );

    return data.regions;
  } catch (err: any) {
    console.log(err.response.statusText);
    return;
  }
};

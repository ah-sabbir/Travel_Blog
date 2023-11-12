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
    console.log(err.response.statusText);
    return;
  }
};

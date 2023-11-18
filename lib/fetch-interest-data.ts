import { GetInterestBySlugOutput } from "@/dtos/interest/get-interest-by-slug.dto";
import axiosInstance from "./axios";
import { GetAllInterestsOutput } from "@/dtos/interest/get-all-interests.dto";

export const getAllInterests = async (specifiedProps: string = "") => {
  try {
    const { data }: { data: GetAllInterestsOutput } = await axiosInstance(
      "/api/public/interests",
      { params: { specifiedProps } }
    );

    return data.interests;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getInterestBySlug = async (slug: string) => {
  try {
    const { data }: { data: GetInterestBySlugOutput } = await axiosInstance(
      `/api/public/interest?slug=${slug}`
    );

    return data.interest;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

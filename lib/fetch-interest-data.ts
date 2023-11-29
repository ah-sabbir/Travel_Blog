import { GetInterestBySlugOutput } from "@/dtos/interest/get-interest-by-slug.dto";
import axiosInstance from "./axios";
import { GetAllInterestsOutput } from "@/dtos/interest/get-all-interests.dto";
import { GetDestinationsOfInterest } from "@/dtos/interest/get-destinations-of-interest";

export const getAllInterests = async (
  specifiedProps: string = "",
  limit: string = ""
) => {
  try {
    const { data }: { data: GetAllInterestsOutput } = await axiosInstance(
      "/api/public/interests",
      { params: { specifiedProps, limit } }
    );

    return data.interests;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getInterestBySlug = async (
  slug: string,
  specifiedProps: string = "",
  populate: string = "",
  nestedProps: string = ""
) => {
  try {
    const { data }: { data: GetInterestBySlugOutput } = await axiosInstance(
      `/api/public/interest?slug=${slug}`,
      { params: { specifiedProps, populate, nestedProps } }
    );

    return data.interest;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getDestinationsOfInterest = async (slug: string) => {
  try {
    const { data }: { data: GetDestinationsOfInterest } = await axiosInstance(
      `/api/public/interest/destinations?slug=${slug}`
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

import { GetAllDestinationsOutput } from "@/dtos/destination/get-all-destinations.dto";
import axiosInstance from "./axios";
import { GetDestinationBySlugOutput } from "@/dtos/destination/get-destination-by-slug.dto";

export const getAllDestinations = async (specifiedProps: string = "") => {
  try {
    const { data }: { data: GetAllDestinationsOutput } = await axiosInstance(
      "/api/public/destinations",
      { params: { specifiedProps } }
    );

    return data.destinations;
  } catch (err: any) {
    console.log(err.response.statusText);
    return;
  }
};

export const getDestinationBySlug = async (slug: string) => {
  try {
    const { data }: { data: GetDestinationBySlugOutput } = await axiosInstance(
      `/api/public/destination?slug=${slug}`
    );

    return data.destination;
  } catch (err: any) {
    console.log(err.response.statusText);
    return;
  }
};

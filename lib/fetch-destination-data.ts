import {
  GetAllDestinationsOutput,
  GetDestinationsForHomepage,
} from "@/dtos/destination/get-all-destinations.dto";
import axiosInstance from "./axios";
import { GetDestinationBySlugOutput } from "@/dtos/destination/get-destination-by-slug.dto";

export const getAllDestinations = async (
  specifiedProps: string = "",
  limit: string = "",
  populate: string = "",
  nestedProps: string = ""
) => {
  try {
    const {
      data,
    }: { data: GetAllDestinationsOutput | GetDestinationsForHomepage } =
      await axiosInstance("/api/public/destinations", {
        params: { specifiedProps, limit, populate, nestedProps },
      });

    return data.destinations;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getDestinationBySlug = async (
  slug: string,
  specifiedProps: string = "",
  populate: boolean = false,
  nestedProps: string = ""
) => {
  try {
    const { data }: { data: GetDestinationBySlugOutput } = await axiosInstance(
      `/api/public/destination?slug=${slug}`,
      { params: { specifiedProps, populate, nestedProps } }
    );

    return data.destination;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

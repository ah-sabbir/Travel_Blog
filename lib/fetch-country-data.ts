import { GetAllCountriesOutput } from "@/dtos/country/get-all-countries.dto";
import axiosInstance from "./axios";
import { GetCountryBySlugOutput } from "@/dtos/country/get-country-by-slug.dto";

export const getAllCountries = async (
  specifiedProps: string = "",
  limit: string = "",
  populate: string = "",
  nestedProps: string = "",
  nestedLimit: string = ""
) => {
  try {
    const { data }: { data: GetAllCountriesOutput } = await axiosInstance(
      "/api/public/countries",
      {
        params: {
          specifiedProps,
          limit,
          populate,
          nestedProps,
          nestedLimit,
        },
      }
    );

    return data.countries;
  } catch (err: any) {
    console.log(err.response.statusText);
    return;
  }
};

export const getCountryBySlug = async (slug: string) => {
  try {
    const { data }: { data: GetCountryBySlugOutput } = await axiosInstance(
      `/api/public/country?slug=${slug}`
    );

    return data.country;
  } catch (err: any) {
    console.log(err.response.statusText);
    return;
  }
};

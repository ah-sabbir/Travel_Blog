import { GetAllCountriesOutput } from "@/dtos/country/get-all-countries.dto";
import axiosInstance from "./axios";
import { GetCountryBySlugOutput } from "@/dtos/country/get-country-by-slug.dto";
import { getNestedDataOfCountryOutput } from "@/dtos/country/get-nested-data-of-country";

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
    console.log(err);
    return;
  }
};

export const getCountryBySlug = async (
  slug: string,
  specifiedProps: string = ""
) => {
  try {
    const { data }: { data: GetCountryBySlugOutput } = await axiosInstance(
      `/api/public/country?slug=${slug}`,
      { params: { specifiedProps } }
    );

    return data.country;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getNestedDataOfCountry = async (
  slug: string,
  specifiedProps: string = "",
  populate: string = "",
  nestedProps: string = "",
  nestedLimit: string = ""
) => {
  try {
    const { data }: { data: getNestedDataOfCountryOutput } =
      await axiosInstance(`/api/public/country/nested?slug=${slug}`, {
        params: {
          specifiedProps,
          populate,
          nestedProps,
          nestedLimit,
        },
      });

    return data.country;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

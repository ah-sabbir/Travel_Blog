import { GetAllGalleriesOutput } from "@/dtos/gallery/get-all-galleries.dto";
import axiosInstance from "./axios";
import { GetGalleryBySlugOutput } from "@/dtos/gallery/get-gallery-by-slug.dto";
import { GetGalleryResultsOutput } from "@/dtos/gallery/get-gallery-results.dto";

export const getAllGalleries = async (specifiedProps: string = "") => {
  try {
    const { data }: { data: GetAllGalleriesOutput } = await axiosInstance(
      "/api/public/galleries",
      { params: { specifiedProps } }
    );

    return data.galleries;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getGalleryBySlug = async (slug: string) => {
  try {
    const { data }: { data: GetGalleryBySlugOutput } = await axiosInstance(
      `/api/public/gallery?slug=${slug}`
    );

    return data.gallery;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getRelatedGalleries = async (
  countryId: string,
  currentId: string
) => {
  try {
    const { data }: { data: GetAllGalleriesOutput } = await axiosInstance(
      `/api/public/galleries/related?countryId=${countryId}&currentId=${currentId}`
    );

    return data.galleries;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getAllGalleriesWithPagination = async (
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetGalleryResultsOutput } = await axiosInstance(
      `/api/public/galleries/pagination`,
      {
        params: { page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameCountryGalleries = async (
  countryId: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetGalleryResultsOutput } = await axiosInstance(
      `/api/public/galleries/same-country`,
      {
        params: { countryId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameCategoryGalleries = async (
  categoryId: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetGalleryResultsOutput } = await axiosInstance(
      `/api/public/galleries/same-category`,
      {
        params: { categoryId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameRegionGalleries = async (
  regionId: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetGalleryResultsOutput } = await axiosInstance(
      `/api/public/galleries/same-region`,
      {
        params: { regionId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameDestinationGalleries = async (
  destinationId: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetGalleryResultsOutput } = await axiosInstance(
      `/api/public/galleries/same-destination`,
      {
        params: { destinationId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameInterestGalleries = async (
  interestId: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetGalleryResultsOutput } = await axiosInstance(
      `/api/public/galleries/same-interest`,
      {
        params: { interestId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getGallerySearchResults = async (
  query: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetGalleryResultsOutput } = await axiosInstance(
      `/api/public/search/galleries`,
      {
        params: { query, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameAuthorGalleries = async (
  userId: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetGalleryResultsOutput } = await axiosInstance(
      `/api/public/galleries/same-author`,
      {
        params: { userId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

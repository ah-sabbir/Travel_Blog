import { GetAllGalleriesOutput } from "@/dtos/gallery/get-all-galleries.dto";
import axiosInstance from "./axios";
import { GetGalleryBySlugOutput } from "@/dtos/gallery/get-gallery-by-slug.dto";

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

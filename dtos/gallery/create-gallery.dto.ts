import { GalleryEntity } from "@/entities/gallery.entity";

export interface CreateGalleryInput
  extends Pick<
    GalleryEntity,
    "name" | "slug" | "description" | "content" | "imagesContent"
  > {
  thumbnail: string;
  credit?: string;
  interestId?: string;
  categoryId?: string;
  countryId?: string;
  regionId?: string;
  destinationId?: string;
  authorId: string;
}

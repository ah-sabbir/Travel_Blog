import { GalleryEntity } from "@/entities/gallery.entity";
import { CoreEntity } from "../common.dto";

export interface GetGalleryBySlugOutput extends CoreEntity {
  gallery: GalleryEntity;
}

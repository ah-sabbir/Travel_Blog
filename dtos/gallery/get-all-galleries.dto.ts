import { CoreOutput } from "../common.dto";
import { GalleryEntity } from "@/entities/gallery.entity";

export interface GetAllGalleriesOutput extends CoreOutput {
  galleries: GalleryEntity[];
}

import { CoreOutput } from "../common.dto";
import { GalleryEntity } from "@/entities/gallery.entity";

export interface GetGalleryResultsOutput extends CoreOutput {
  galleries?: GalleryEntity[];
  totalPages?: number;
  numberOfResults?: number;
}

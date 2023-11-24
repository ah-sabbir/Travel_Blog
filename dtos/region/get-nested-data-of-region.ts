import { DestinationEntity } from "@/entities/destination.entity";
import { CoreOutput } from "../common.dto";
import { ArticleEntity } from "@/entities/article.entity";
import { GalleryEntity } from "@/entities/gallery.entity";

export interface getNestedDataOfRegionOutput extends CoreOutput {
  region: {
    destinations?: DestinationEntity[];
    articles?: ArticleEntity[];
    galleries?: GalleryEntity[];
  };
}

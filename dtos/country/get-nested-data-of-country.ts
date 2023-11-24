import { DestinationEntity } from "@/entities/destination.entity";
import { CoreOutput } from "../common.dto";
import { ArticleEntity } from "@/entities/article.entity";
import { GalleryEntity } from "@/entities/gallery.entity";

export interface getNestedDataOfCountryOutput extends CoreOutput {
  country: {
    destinations?: DestinationEntity[];
    articles?: ArticleEntity[];
    galleries?: GalleryEntity[];
  };
}

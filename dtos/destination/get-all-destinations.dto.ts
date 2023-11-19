import { DestinationEntity } from "@/entities/destination.entity";
import { CoreOutput } from "../common.dto";

export interface GetAllDestinationsOutput extends CoreOutput {
  destinations: DestinationEntity[];
}

export interface GetDestinationsForHomepage extends CoreOutput {
  destinations: {
    _id: string;
    name: string;
    slug: string;
    thumbnail: {
      public_id: string;
      url: string;
    };
    country: { _id: string; name: string };
  }[];
}

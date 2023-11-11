import { DestinationEntity } from "@/entities/destination.entity";

export interface CreateDestinationInput
  extends Pick<DestinationEntity, "name" | "slug" | "description" | "content"> {
  thumbnail: string;
  interestId?: string;
  countryId?: string;
  regionId?: string;
  address: string;
  instruction?: string;
  images?: string[];
}

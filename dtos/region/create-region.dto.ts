import { RegionEntity } from "@/entities/region.entity";

export interface CreateRegionInput
  extends Pick<RegionEntity, "name" | "slug" | "description" | "content"> {
  thumbnail: string;
  banner: string;
  countryId: string;
}

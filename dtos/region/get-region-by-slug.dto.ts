import { CoreEntity } from "../common.dto";
import { RegionEntity } from "@/entities/region.entity";

export interface GetRegionBySlugOutput extends CoreEntity {
  region: RegionEntity;
}

import { RegionEntity } from "@/entities/region.entity";
import { CoreOutput } from "../common.dto";

export interface GetAllRegionsOutput extends CoreOutput {
  regions: RegionEntity[];
}

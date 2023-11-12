import { CoreEntity } from "../common.dto";
import { BrandTypeEntity } from "@/entities/brandType.entity";

export interface GetBrandTypeBySlugOutput extends CoreEntity {
  brandType: BrandTypeEntity;
}

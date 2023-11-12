import { BrandEntity } from "@/entities/brand.entity";
import { CoreEntity } from "../common.dto";

export interface GetBrandBySlugOutput extends CoreEntity {
  brand: BrandEntity;
}

import { CoreOutput } from "../common.dto";
import { BrandEntity } from "@/entities/brand.entity";

export interface GetAllBrandsOutput extends CoreOutput {
  brands: BrandEntity[];
}

import { CoreOutput } from "../common.dto";
import { BrandEntity } from "@/entities/brand.entity";

export interface GetBrandResultsOutput extends CoreOutput {
  brands?: BrandEntity[];
  totalPages?: number;
}

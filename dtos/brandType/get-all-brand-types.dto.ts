import { BrandTypeEntity } from "@/entities/brandType.entity";
import { CoreOutput } from "../common.dto";

export interface GetAllBrandTypesOutput extends CoreOutput {
  brandTypes: BrandTypeEntity[];
}

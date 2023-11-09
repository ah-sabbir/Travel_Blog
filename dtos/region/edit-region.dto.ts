import { CreateRegionInput } from "./create-region.dto";

export interface EditRegionInput extends CreateRegionInput {
  id: string;
}

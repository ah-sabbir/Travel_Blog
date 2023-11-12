import { CreateBrandInput } from "./create-brand.dto";

export interface EditBrandInput extends CreateBrandInput {
  brandId: string;
}

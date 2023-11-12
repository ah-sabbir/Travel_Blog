import { CreateBrandTypeInput } from "./create-brand-type.dto";

export interface EditBrandTypeInput extends CreateBrandTypeInput {
  brandTypeId: string;
}

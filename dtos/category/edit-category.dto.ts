import { CoreOutput } from "../common.dto";
import { CreateCategoryInput } from "./create-category.dto";

export interface EditCategoryInput extends CreateCategoryInput {
  id: string;
}

export interface EditCategoryOutput extends CoreOutput {}

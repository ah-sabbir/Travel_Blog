import { CoreOutput } from "../common.dto";

export interface CreateCategoryInput {
  name: string;
  slug: string;
}

export interface CreateCategoryOutput extends CoreOutput {}

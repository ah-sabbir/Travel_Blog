import { CategoryEntity } from "@/entities/category.entity";
import { CoreOutput } from "../common.dto";

export interface GetAllCategoriesOutput extends CoreOutput {
  categories: CategoryEntity[];
}

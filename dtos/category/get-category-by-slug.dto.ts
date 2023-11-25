import { CoreEntity } from "../common.dto";
import { CategoryEntity } from "@/entities/category.entity";

export interface GetCategoryBySlugOutput extends CoreEntity {
  category: CategoryEntity;
}

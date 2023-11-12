import { BrandTypeEntity } from "@/entities/brandType.entity";

export interface CreateBrandTypeInput
  extends Pick<BrandTypeEntity, "name" | "slug"> {}

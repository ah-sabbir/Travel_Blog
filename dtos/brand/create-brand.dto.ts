import { BrandEntity } from "@/entities/brand.entity";

export interface CreateBrandInput
  extends Pick<
    BrandEntity,
    "name" | "slug" | "description" | "content" | "link" | "affLink"
  > {
  logo: string;
  brandTypeId?: string;
}

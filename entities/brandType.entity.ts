import { ObjectId } from "mongodb";

export interface BrandTypeEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  brands: [];
}

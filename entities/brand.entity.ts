import { ObjectId } from "mongodb";
import { BrandTypeEntity } from "./brandType.entity";

export interface BrandEntity {
  _id: ObjectId;
  name: string;
  description: string;
  slug: string;
  link: string;
  affLink: string;
  logo: {
    public_id: string;
    url: string;
  };
  views: number;
  content: string;
  brandType: BrandTypeEntity;
}

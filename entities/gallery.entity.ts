import { ObjectId } from "mongodb";
import { RegionEntity } from "./region.entity";
import { CategoryEntity } from "./category.entity";
import { InterestEntity } from "./interest.entity";
import { CountryEntity } from "./country.entity";
import { DestinationEntity } from "./destination.entity";
import { UserEntity } from "./user.entity";

export interface GalleryEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  content: string;
  imagesContent: string;
  credit: string;
  region: RegionEntity;
  category: CategoryEntity;
  interest: InterestEntity;
  country: CountryEntity;
  destination: DestinationEntity;
  thumbnail: {
    public_id: string;
    url: string;
  };
  comments: [];
  views: number;
  author: UserEntity;
  createdAt: string;
  updatedAt: string;
}

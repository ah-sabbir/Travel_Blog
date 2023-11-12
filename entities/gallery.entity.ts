import { ObjectId } from "mongodb";

export interface GalleryEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  content: string;
  imagesContent: string;
  credit: string;
  region: ObjectId;
  category: ObjectId;
  interest: ObjectId;
  country: ObjectId;
  destination: ObjectId;
  thumbnail: {
    public_id: string;
    url: string;
  };
  comments: [];
  views: number;
  author: ObjectId;
  createdAt: string;
  updatedAt: string;
}

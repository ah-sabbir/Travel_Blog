import { ObjectId } from "mongodb";

export interface ArticleEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  content: string;
  region: ObjectId;
  category: ObjectId;
  interest: ObjectId;
  country: any;
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

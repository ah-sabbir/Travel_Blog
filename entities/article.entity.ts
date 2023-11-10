import { ObjectId } from "mongodb";

export interface ArticleEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  content: string;
  articles: [];
  galleries: [];
  region: ObjectId;
  category: ObjectId;
  interest: ObjectId;
  country: ObjectId;
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

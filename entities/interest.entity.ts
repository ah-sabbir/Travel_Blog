import { ObjectId } from "mongodb";

export interface InterestEntity {
  _id: ObjectId;
  name: string;
  description: string;
  destinations: ObjectId[];
  slug: string;
  thumbnail: {
    public_id: string;
    url: string;
  };
  articles: [];
  galleries: [];
}

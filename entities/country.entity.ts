import { ObjectId } from "mongodb";

export interface CountryEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  content: string;
  articles: [];
  galleries: [];
  destinations: [];
  regions: [];
  thumbnail: {
    public_id: string;
    url: string;
  };
  views: number;
}

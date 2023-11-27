import { ObjectId } from "mongodb";

export interface DestinationEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  content: string;
  articles: [];
  galleries: [];
  region: any;
  interest: any;
  country: any;
  thumbnail: {
    public_id: string;
    url: string;
  };
  images: string[];
  views: number;
  address: string;
  instruction: string;
  comments: [];
}

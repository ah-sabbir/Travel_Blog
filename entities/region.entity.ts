import { ObjectId } from "mongodb";

export interface RegionEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  content: string;
  articles: [];
  galleries: [];
  regions: [];
  countryId: string;
  thumbnail: {
    public_id: string;
    url: string;
  };
  banner: {
    public_id: string;
    url: string;
  };
  views: number;
}

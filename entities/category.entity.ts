import { ObjectId } from "mongodb";

export interface CategoryEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  articles: [];
  galleries: [];
}

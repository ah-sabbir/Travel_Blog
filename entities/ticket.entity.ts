import { ObjectId } from "mongodb";

export interface TicketEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  price: string;
  link: string;
  views: number;
  images: string[];
  brand: ObjectId;
  ticketType: ObjectId;
  region: ObjectId;
  country: ObjectId;
  content: string;
  thumbnail: {
    public_id: string;
    url: string;
  };
}

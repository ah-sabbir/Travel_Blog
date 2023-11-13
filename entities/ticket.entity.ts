import { ObjectId } from "mongodb";

export interface TicketEntity {
  name: string;
  slug: string;
  description: string;
  price: string;
  link: string;
  brand: ObjectId;
  views: number;
  images: string[];
  ticketType: ObjectId;
  region: ObjectId;
  country: ObjectId;
  content: string;
}

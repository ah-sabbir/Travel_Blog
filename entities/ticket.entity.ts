import { ObjectId } from "mongodb";
import { BrandEntity } from "./brand.entity";
import { TicketTypeEntity } from "./ticketType.entity";
import { RegionEntity } from "./region.entity";
import { CountryEntity } from "./country.entity";

export interface TicketEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  price: string;
  link: string;
  views: number;
  images: string[];
  brand: BrandEntity;
  ticketType: TicketTypeEntity;
  region: RegionEntity;
  country: CountryEntity;
  content: string;
  thumbnail: {
    public_id: string;
    url: string;
  };
}

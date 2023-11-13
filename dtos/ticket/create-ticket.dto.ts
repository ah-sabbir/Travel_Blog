import { TicketEntity } from "@/entities/ticket.entity";

export interface CreateTicketInput
  extends Pick<
    TicketEntity,
    "name" | "slug" | "description" | "content" | "price" | "link"
  > {
  thumbnail: string;
  countryId?: string;
  ticketTypeId?: string;
  brandId?: string;
  regionId?: string;
  images?: { link: string }[];
}

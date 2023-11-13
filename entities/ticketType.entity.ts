import { ObjectId } from "mongodb";

export interface TicketTypeEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  tickets: [];
}

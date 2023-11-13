import { TicketEntity } from "@/entities/ticket.entity";
import { CoreEntity } from "../common.dto";

export interface GetTicketBySlugOutput extends CoreEntity {
  ticket: TicketEntity;
}

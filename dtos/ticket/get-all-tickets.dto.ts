import { CoreOutput } from "../common.dto";
import { TicketEntity } from "@/entities/ticket.entity";

export interface GetAllTicketsOutput extends CoreOutput {
  tickets: TicketEntity[];
}

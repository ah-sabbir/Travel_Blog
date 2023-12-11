import { TicketEntity } from "@/entities/ticket.entity";
import { CoreOutput } from "../common.dto";

export interface GetTicketResultsOutput extends CoreOutput {
  tickets?: TicketEntity[];
  totalPages?: number;
  numberOfResults?: number;
}

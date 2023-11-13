import { CreateTicketInput } from "./create-ticket.dto";

export interface EditTicketInput extends CreateTicketInput {
  ticketId: string;
}

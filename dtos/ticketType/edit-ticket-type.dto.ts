import { CreateTicketTypeInput } from "./create-ticket-type.dto";

export interface EditTicketTypeInput extends CreateTicketTypeInput {
  id: string;
}

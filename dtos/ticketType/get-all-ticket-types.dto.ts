import { CoreOutput } from "../common.dto";
import { TicketTypeEntity } from "@/entities/ticketType.entity";

export interface GetAllTicketTypesOutput extends CoreOutput {
  ticketTypes: TicketTypeEntity[];
}

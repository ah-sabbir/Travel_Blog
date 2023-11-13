import { TicketTypeEntity } from "@/entities/ticketType.entity";
import { CoreEntity } from "../common.dto";

export interface GetTicketTypeBySlugOutput extends CoreEntity {
  ticketType: TicketTypeEntity;
}

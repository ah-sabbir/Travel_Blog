import { TicketTypeEntity } from "@/entities/ticketType.entity";

export interface CreateTicketTypeInput
  extends Pick<TicketTypeEntity, "name" | "slug"> {}

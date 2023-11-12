import { DestinationEntity } from "@/entities/destination.entity";
import { CoreEntity } from "../common.dto";

export interface GetDestinationBySlugOutput extends CoreEntity {
  destination: DestinationEntity;
}

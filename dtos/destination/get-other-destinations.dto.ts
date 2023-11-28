import { DestinationEntity } from "@/entities/destination.entity";
import { CoreEntity } from "../common.dto";

export interface GetOtherDestinations extends CoreEntity {
  destinations: DestinationEntity[];
}

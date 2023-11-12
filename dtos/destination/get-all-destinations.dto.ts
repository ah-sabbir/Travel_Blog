import { DestinationEntity } from "@/entities/destination.entity";
import { CoreOutput } from "../common.dto";

export interface GetAllDestinationsOutput extends CoreOutput {
  destinations: DestinationEntity[];
}

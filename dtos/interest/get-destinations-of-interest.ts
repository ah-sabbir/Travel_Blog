import { DestinationEntity } from "@/entities/destination.entity";
import { CoreOutput } from "../common.dto";

export interface GetDestinationsOfInterest extends CoreOutput {
  destinations?: DestinationEntity[];
}

import { DestinationEntity } from "@/entities/destination.entity";
import { CoreOutput } from "../common.dto";

export interface GetDestinationResultsOutput extends CoreOutput {
  destinations?: DestinationEntity[];
  totalPages?: number;
  numberOfResults?: number;
}

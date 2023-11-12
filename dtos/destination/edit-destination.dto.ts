import { CreateDestinationInput } from "./create-destination.dto";

export interface EditDestinationInput extends CreateDestinationInput {
  destinationId: string;
}

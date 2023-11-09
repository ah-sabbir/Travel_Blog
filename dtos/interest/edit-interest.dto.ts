import { CreateInterestInput } from "./create-interest.dto";

export interface EditInterestInput extends CreateInterestInput {
  id: string;
}

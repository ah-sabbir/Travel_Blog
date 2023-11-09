import { InterestEntity } from "@/entities/interest.entity";
import { CoreOutput } from "../common.dto";

export interface GetAllInterestsOutput extends CoreOutput {
  interests: InterestEntity[];
}

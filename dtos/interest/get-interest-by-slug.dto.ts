import { InterestEntity } from "@/entities/interest.entity";
import { CoreEntity } from "../common.dto";

export interface GetInterestBySlugOutput extends CoreEntity {
  interest: InterestEntity;
}

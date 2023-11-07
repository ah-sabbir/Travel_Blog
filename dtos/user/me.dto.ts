import { UserEntity } from "@/entities/user.entity";
import { CoreOutput } from "../common.dto";

export interface MeOutput extends CoreOutput {
  user: UserEntity;
}

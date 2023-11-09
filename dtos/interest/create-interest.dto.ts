import { InterestEntity } from "@/entities/interest.entity";

export interface CreateInterestInput
  extends Pick<InterestEntity, "name" | "slug" | "description"> {
  thumbnail: string;
}

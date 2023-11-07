import { UserEntity } from "@/entities/user.entity";
import { CoreOutput } from "../common.dto";
import { IDatabaseImage } from "@/lib/cloudinary";

export interface EditProfileInput
  extends Partial<
    Pick<
      UserEntity,
      | "name"
      | "email"
      | "description"
      | "facebook"
      | "youtube"
      | "twitter"
      | "linkedin"
    >
  > {
  id: string;
  avatar: string | IDatabaseImage;
}

export interface EditProfileOutput extends CoreOutput {}

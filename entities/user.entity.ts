import { CoreEntity } from "../dtos/common.dto";

export interface UserEntity extends CoreEntity {
  name: string;
  email: string;
  role: string;
  description?: string;
  galleries: [];
  articles: [];
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  avatar?: {
    public_id: string;
    url: string;
  };
}

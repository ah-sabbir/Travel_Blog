import { CoreOutput } from "../common.dto";

export interface ChangePasswordInput {
  id: string;
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordOutput extends CoreOutput {}

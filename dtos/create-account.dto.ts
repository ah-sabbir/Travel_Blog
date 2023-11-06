import { CoreOutput } from "./common.dto";

export interface CreateAccountInput {
  email: string;
  password: string;
  name: string;
}

export interface CreateAccountOutput extends CoreOutput {}

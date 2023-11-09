import { CreateCountryInput } from "./create-country.dto";

export interface EditCountryInput extends CreateCountryInput {
  id: string;
}

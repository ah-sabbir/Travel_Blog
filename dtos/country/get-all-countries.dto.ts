import { CountryEntity } from "@/entities/country.entity";
import { CoreOutput } from "../common.dto";

export interface GetAllCountriesOutput extends CoreOutput {
  countries: CountryEntity[];
}

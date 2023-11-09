import { CountryEntity } from "@/entities/country.entity";
import { CoreEntity } from "../common.dto";

export interface GetCountryBySlugOutput extends CoreEntity {
  country: CountryEntity;
}

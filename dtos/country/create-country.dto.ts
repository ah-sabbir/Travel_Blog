import { CountryEntity } from "@/entities/country.entity";

export interface CreateCountryInput
  extends Pick<CountryEntity, "name" | "slug" | "description" | "content"> {
  thumbnail: string;
}

import { CountryEntity } from "@/entities/country.entity";
import { CoreOutput } from "../common.dto";
import { ObjectId } from "mongodb";

export interface GetAllCountriesOutput extends CoreOutput {
  countries: CountryEntity[];
}

export interface CountryForHeader {
  _id: ObjectId;
  name: string;
  slug: string;
  regions: { name: string; slug: string; _id: ObjectId }[];
}

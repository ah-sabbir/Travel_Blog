"use client";

import { CountryForHeader } from "@/dtos/country/get-all-countries.dto";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import DropdownHeading from "./dropdown-heading";
import { getAllCountries } from "@/lib/fetch-country-data";

interface Props {
  wrapperClasses?: string;
}

const DestinationsDropdown: FC<Props> = ({ wrapperClasses }): JSX.Element => {
  const [countries, setCountries] = useState<CountryForHeader[]>();

  const fetchCountries = async () => {
    const countries = await getAllCountries(
      "name slug",
      "5",
      "regions",
      "name slug",
      "16"
    );
    setCountries(countries as any);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div
      className={`!font-nunito !not-italic !text-base header-dropdown-card top-[150%] text-black_text w-[990px] ${wrapperClasses}`}
    >
      <div className="grid grid-cols-2 gap-6 p-6">
        {countries?.map((country) => (
          <div key={country._id.toString()}>
            <DropdownHeading link="" title={country.name} />

            <ul className="grid grid-cols-4 gap-[10px] pt-2">
              {country.regions.map((region) => (
                <Link
                  key={region._id.toString()}
                  href=""
                  className="header-dropdown-item"
                >
                  {region.name}
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Link
        href=""
        className="flex items-center justify-center gap-2 py-3 bg-[#f0e8e7] hover:underline"
      >
        Tất cả bài viết <FaChevronRight size={12} />
      </Link>
    </div>
  );
};

export default DestinationsDropdown;
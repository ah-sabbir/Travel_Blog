import { CountryForHeader } from "@/dtos/country/get-all-countries.dto";
import Link from "next/link";
import { FC } from "react";
import { FaChevronRight } from "react-icons/fa";
import DropdownHeading from "./dropdown-heading";

interface Props {
  countries: CountryForHeader[] | undefined;
}

const DestinationsDropdown: FC<Props> = ({ countries }): JSX.Element => {
  return (
    <div className="header-dropdown-card top-[150%] -left-1/3 text-black_text w-[990px]">
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

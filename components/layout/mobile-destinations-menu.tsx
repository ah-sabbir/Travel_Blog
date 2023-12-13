import Link from "next/link";
import { FC } from "react";
import { FaChevronRight } from "react-icons/fa";
import DropdownHeading from "./dropdown-heading";
import { path } from "@/constant";
import { destinationMenu } from "@/data/menu";

interface Props {}

const MobileDestinationsMenu: FC<Props> = (): JSX.Element => {
  return (
    <div className={`!not-italic !text-base text-black_text`}>
      <div className="space-y-6">
        {destinationMenu?.map((country) => (
          <div key={country.name}>
            <DropdownHeading
              link={`${path.country}${country.slug}`}
              title={country.name}
            />

            <ul className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-[10px] pt-2">
              {country.regions.map((region) => (
                <Link
                  key={region.name}
                  href={`${path.region}${region.slug}`}
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
        href={`${path.allCountries}`}
        className="flex rounded-md mt-6 items-center justify-center gap-2 py-3 bg-[#DFF0F0] hover:underline"
      >
        Tất cả quốc gia <FaChevronRight size={12} />
      </Link>
    </div>
  );
};

export default MobileDestinationsMenu;

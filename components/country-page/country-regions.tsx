import { path } from "@/constant";
import { CategoryEntity } from "@/entities/category.entity";
import { getSameCountryRegions } from "@/lib/fetch-region-data";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  countryId: string | undefined;
  regionId?: string | undefined;
}

const CountryRegions: FC<Props> = ({ countryId, regionId }): JSX.Element => {
  const [regions, setRegions] = useState<CategoryEntity[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchRegions = async () => {
    if (!countryId) {
      return;
    }

    setIsLoading(true);
    const allRegions = await getSameCountryRegions(countryId, regionId);
    setRegions(allRegions);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="category-cards-grid">
          {[...Array(16).keys()].map((item) => (
            <Skeleton className="w-full h-[40px] !rounded-[40px]" key={item} />
          ))}
        </div>
      ) : (
        <>
          {regions && regions?.length > 0 ? (
            <div className="flex items-center gap-x-[10px] gap-y-4 flex-wrap">
              {regions?.map((region) => (
                <Link
                  key={region._id.toString()}
                  href={`${path.region}${region.slug}`}
                  className="header-dropdown-item !px-3 !block"
                >
                  {region.name}
                </Link>
              ))}
            </div>
          ) : (
            <p>Không tìm thấy tỉnh / thành nào</p>
          )}
        </>
      )}
    </>
  );
};

export default CountryRegions;

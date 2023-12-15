import { path } from "@/constant";
import { BrandTypeEntity } from "@/entities/brandType.entity";
import { getAllBrandTypes } from "@/lib/fetch-brand-type-data";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  currentId: string | undefined;
}

const OtherBrandTypes: FC<Props> = ({ currentId }): JSX.Element => {
  const [brandTypes, setBrandTypes] = useState<BrandTypeEntity[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchOtherBrandTypes = async () => {
    setIsLoading(true);
    const allBrandTypes = await getAllBrandTypes("name slug");

    const otherBrandTypes = allBrandTypes?.filter(
      (brandType) => brandType._id.toString() !== currentId
    );

    setBrandTypes(otherBrandTypes);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOtherBrandTypes();
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
        <div className="flex items-center gap-[10px] flex-wrap">
          {brandTypes?.map((brandType) => (
            <Link
              key={brandType._id.toString()}
              href={`${path.brandType}${brandType.slug}`}
              className="header-dropdown-item !px-3 !block"
            >
              {brandType.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default OtherBrandTypes;

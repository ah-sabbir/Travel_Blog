import { path } from "@/constant";
import { InterestEntity } from "@/entities/interest.entity";
import { getAllInterests } from "@/lib/fetch-interest-data";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  currentId: string | undefined;
}

const OtherInterests: FC<Props> = ({ currentId }): JSX.Element => {
  const [interests, setInterests] = useState<InterestEntity[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchOtherInterests = async () => {
    setIsLoading(true);
    const allInterests = await getAllInterests("name slug");

    const otherInterests = allInterests?.filter(
      (interest) => interest._id.toString() !== currentId
    );

    setInterests(otherInterests);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOtherInterests();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-8 gap-4">
          {[...Array(16).keys()].map((item) => (
            <Skeleton className="w-full h-[40px] !rounded-[40px]" key={item} />
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-[10px] flex-wrap">
          {interests?.map((interest) => (
            <Link
              key={interest._id.toString()}
              href={`${path.interest}${interest.slug}`}
              className="header-dropdown-item !px-3 !block"
            >
              {interest.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default OtherInterests;

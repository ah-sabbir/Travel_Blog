import { DestinationEntity } from "@/entities/destination.entity";
import { FC, useEffect, useState } from "react";
import DestinationCard from "../destination-card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getOtherDestinations } from "@/lib/fetch-destination-data";

interface Props {
  regionId: string | undefined;
  currentId: string | undefined;
}

const OtherDestinations: FC<Props> = ({ currentId, regionId }): JSX.Element => {
  const [destinations, setDestinations] = useState<DestinationEntity[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchDestinations = async () => {
    setIsLoading(true);
    const data = await getOtherDestinations(currentId || "", regionId || "");
    setDestinations(data);
    setIsLoading(false);
  };

  console.log(destinations);

  useEffect(() => {
    fetchDestinations();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-4">
      {isLoading ? (
        <>
          {[...Array(12).keys()].map((item) => (
            <Skeleton className="w-full aspect-[0.755]" key={item} />
          ))}
        </>
      ) : (
        <>
          {destinations?.map((destination) => (
            <DestinationCard
              key={destination._id.toString()}
              destination={destination}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default OtherDestinations;

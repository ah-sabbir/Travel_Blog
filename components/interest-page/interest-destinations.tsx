import { DestinationEntity } from "@/entities/destination.entity";
import { FC, useEffect, useState } from "react";
import DestinationCard from "../destination-card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getDestinationsOfInterest } from "@/lib/fetch-interest-data";

interface Props {
  slug: string | undefined;
}

const InterestDestinations: FC<Props> = ({ slug }): JSX.Element => {
  const [destinations, setDestinations] = useState<DestinationEntity[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchDestinations = async () => {
    setIsLoading(true);
    const destinations = await getDestinationsOfInterest(slug || "");
    setDestinations(destinations?.destinations);
    setIsLoading(false);
  };

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

export default InterestDestinations;

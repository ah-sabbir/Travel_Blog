import { DestinationEntity } from "@/entities/destination.entity";
import { getNestedDataOfCountry } from "@/lib/fetch-country-data";
import { FC, useEffect, useState } from "react";
import DestinationCard from "../destination-card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  slug: string | undefined;
  countryName: string | undefined;
}

const CountryDestinations: FC<Props> = ({ slug, countryName }): JSX.Element => {
  const [destinations, setDestinations] = useState<DestinationEntity[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchDestinations = async () => {
    setIsLoading(true);
    const destinations = await getNestedDataOfCountry(
      slug || "",
      "destinations",
      "destinations",
      "thumbnail name slug",
      "20"
    );
    setIsLoading(false);
    setDestinations(destinations?.destinations);
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
              countryName={countryName}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CountryDestinations;

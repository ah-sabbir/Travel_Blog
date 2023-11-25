import { DestinationEntity } from "@/entities/destination.entity";
import { getNestedDataOfCountry } from "@/lib/fetch-country-data";
import { FC, useEffect, useState } from "react";
import DestinationCard from "../destination-card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getNestedDataOfRegion } from "@/lib/fetch-region-data";

interface Props {
  slug: string | undefined;
  regionName: string | undefined;
}

const RegionDestinations: FC<Props> = ({ slug, regionName }): JSX.Element => {
  const [destinations, setDestinations] = useState<DestinationEntity[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [countryName, setCountryName] = useState("");

  const fetchDestinations = async () => {
    setIsLoading(true);
    const data = await getNestedDataOfRegion(
      slug || "",
      "countryId",
      "destinations",
      "thumbnail name slug",
      "20"
    );
    setIsLoading(false);
    setDestinations(data?.region?.destinations);
    setCountryName(data?.country || "");
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

export default RegionDestinations;

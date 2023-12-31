import { DestinationEntity } from "@/entities/destination.entity";
import { FC, useEffect, useState } from "react";
import DestinationCard from "../destination-card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { getSameInterestDestinations } from "@/lib/fetch-destination-data";

interface Props {
  destinationId: string | undefined;
  interestId: string | undefined;
}

const InterestDestinations: FC<Props> = ({
  destinationId,
  interestId,
}): JSX.Element => {
  const [destinations, setDestinations] = useState<DestinationEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    if (!interestId) {
      return;
    }

    setIsLoading(true);
    const data = await getSameInterestDestinations(
      destinationId,
      interestId,
      currentPage,
      8
    );
    setDestinations(data?.destinations || []);
    setTotalPages(data?.totalPages || 1);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, [interestId, currentPage]);
  return (
    <div>
      <>
        {isLoading ? (
          <div className="destination-cards-grid">
            {[...Array(8).keys()].map((item) => (
              <Skeleton className="w-full aspect-[0.755]" key={item} />
            ))}
          </div>
        ) : (
          <>
            {destinations && destinations?.length > 0 ? (
              <div>
                <div className="destination-cards-grid">
                  {destinations?.map((destination) => (
                    <DestinationCard
                      key={destination._id.toString()}
                      destination={destination}
                    />
                  ))}
                </div>
                <div className="pagination-wrapper">
                  <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                    previousLabel="Trước"
                    nextLabel="Sau"
                  />
                </div>
              </div>
            ) : (
              <p>Không tìm thấy địa danh nào</p>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default InterestDestinations;

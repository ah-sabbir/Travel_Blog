import { FC, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { GalleryEntity } from "@/entities/gallery.entity";
import GalleryCard from "../gallery-card";
import { getSameInterestGalleries } from "@/lib/fetch-gallery-data";

interface Props {
  interestId: string | undefined;
}

const InterestGalleries: FC<Props> = ({ interestId }): JSX.Element => {
  const [galleries, setGalleries] = useState<GalleryEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    if (!interestId) {
      return;
    }

    setIsLoading(true);
    const data = await getSameInterestGalleries(interestId, currentPage, 6);
    setGalleries(data?.galleries || []);
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
          <div className="grid grid-cols-3 gap-6">
            {[...Array(6).keys()].map((item) => (
              <Skeleton className="w-full aspect-[0.755]" key={item} />
            ))}
          </div>
        ) : (
          <>
            {galleries && galleries?.length > 0 ? (
              <div>
                <div className="grid grid-cols-3 gap-6">
                  {galleries?.map((gallery) => (
                    <GalleryCard
                      key={gallery._id.toString()}
                      gallery={gallery}
                    />
                  ))}
                </div>
                <div className="pagination-wrapper">
                  <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                    previousLabel="Trang trước"
                    nextLabel="Trang sau"
                  />
                </div>
              </div>
            ) : (
              <p>Không tìm thấy thư viện ảnh nào</p>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default InterestGalleries;

import { FC, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { GalleryEntity } from "@/entities/gallery.entity";
import { getSameRegionGalleries } from "@/lib/fetch-gallery-data";
import GalleryCard from "../gallery-card";

interface Props {
  regionId: string | undefined;
}

const RegionGalleries: FC<Props> = ({ regionId }): JSX.Element => {
  const [galleries, setGalleries] = useState<GalleryEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    if (!regionId) {
      return;
    }

    setIsLoading(true);
    const data = await getSameRegionGalleries(regionId, currentPage, 6);
    setGalleries(data?.galleries || []);
    setTotalPages(data?.totalPages || 1);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, [regionId, currentPage]);

  return (
    <div>
      <>
        {isLoading ? (
          <div className="cards-grid">
            {[...Array(6).keys()].map((item) => (
              <Skeleton className="w-full aspect-[0.755]" key={item} />
            ))}
          </div>
        ) : (
          <>
            {galleries && galleries?.length > 0 ? (
              <div>
                <div className="cards-grid">
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

export default RegionGalleries;

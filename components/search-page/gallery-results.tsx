import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { GalleryEntity } from "@/entities/gallery.entity";
import { getGallerySearchResults } from "@/lib/fetch-gallery-data";
import GalleryCard from "../gallery-card";

interface Props {
  query: string | null;
  setTotalResults: Dispatch<SetStateAction<number>>;
}

const GalleryResults: FC<Props> = ({ query, setTotalResults }): JSX.Element => {
  const [galleries, setGalleries] = useState<GalleryEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    if (!query || !query.trim()) {
      return;
    }

    setIsLoading(true);
    const data = await getGallerySearchResults(query, currentPage, 6);
    setGalleries(data?.galleries || []);
    setTotalPages(data?.totalPages || 1);
    setTotalResults(data?.numberOfResults || 0);
    setIsLoading(false);
  };

  console.log(galleries);

  useEffect(() => {
    fetchResults();
  }, [query, currentPage]);

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
                <div className="grid grid-cols-3 container gap-6">
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
                    previousLabel="Trước"
                    nextLabel="Sau"
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

export default GalleryResults;

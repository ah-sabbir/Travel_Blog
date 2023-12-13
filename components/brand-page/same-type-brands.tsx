import { FC, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { BrandEntity } from "@/entities/brand.entity";
import { getSameTypeBrands } from "@/lib/fetch-brand-data";
import BrandCard from "../brand-card";

interface Props {
  brandId: string | undefined;
  brandTypeId: string | undefined;
}

const SameTypeBrands: FC<Props> = ({ brandId, brandTypeId }): JSX.Element => {
  const [brands, setBrands] = useState<BrandEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    setIsLoading(true);
    const data = await getSameTypeBrands(brandId, brandTypeId, currentPage, 6);
    setBrands(data?.brands || []);
    setTotalPages(data?.totalPages || 1);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, [brandId, brandTypeId, currentPage]);

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
            {brands && brands?.length > 0 ? (
              <div>
                <div className="grid grid-cols-3 gap-6">
                  {brands?.map((brand) => (
                    <BrandCard key={brand._id.toString()} brand={brand} />
                  ))}
                </div>
                <div className="w-fit pagination pt-12 max-[500px]:pt-8 mx-auto">
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
              <p>Không tìm thấy loại vé nào</p>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default SameTypeBrands;

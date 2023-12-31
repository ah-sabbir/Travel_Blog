"use client";

import { GalleryEntity } from "@/entities/gallery.entity";
import { getAllGalleriesWithPagination } from "@/lib/fetch-gallery-data";
import { FC, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { path } from "@/constant";
import GalleryCard from "../gallery-card";

interface Props {}

const HomeGalleries: FC<Props> = (): JSX.Element => {
  const [galleries, setGalleries] = useState<GalleryEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const data = await getAllGalleriesWithPagination(currentPage, 6);
      setGalleries(data?.galleries || []);
      setTotalPages(data?.totalPages || 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [currentPage]);

  return (
    <div>
      <div className="flex items-baseline justify-between max-[500px]:text-center max-[500px]:block">
        <h4 className="font-dancing text-admin_primary font-bold text-[40px] mb-3 max-[500px]:mb-0">
          Thư viện ảnh của tôi
        </h4>

        <Link
          href={`${path.allGalleries}`}
          className="font-bold underline max-[500px]:mb-6 max-[500px]:block"
        >
          Xem tất cả
        </Link>
      </div>
      <>
        {isLoading ? (
          <div className="cards-grid ">
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

export default HomeGalleries;

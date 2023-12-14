"use client";

import { formatShortDate } from "@/lib/format-date";
import { FC, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "react-loading-skeleton/dist/skeleton.css";
import GalleryCard from "../article-card";
import Skeleton from "react-loading-skeleton";
import { GalleryEntity } from "@/entities/gallery.entity";
import { getAllGalleriesWithPagination } from "@/lib/fetch-gallery-data";

interface Props {}

const AllGalleriesPageContent: FC<Props> = (props): JSX.Element => {
  const [galleries, setGalleries] = useState<GalleryEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [numberOfResults, setNumberOfResults] = useState(0);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const data = await getAllGalleriesWithPagination(currentPage, 6);
      setGalleries(data?.galleries || []);
      setTotalPages(data?.totalPages || 1);
      setNumberOfResults(data?.numberOfResults || 0);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [currentPage]);

  return (
    <>
      <div className="sub-page-cover relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
          <h1 className="font-dancing font-bold text-admin_primary mb-2 text-[60px] text-center">
            Tất cả thư viện ảnh{" "}
            <span className="text-[45px]">({numberOfResults})</span>
          </h1>
          <p className="text-center text-lg font-semibold flex items-center gap-3 justify-center">
            Từ ngày 03/11/2023 đến {formatShortDate(new Date().toDateString())}
          </p>
        </div>
      </div>

      <div className="container mt-[30px]">
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
                  {galleries?.map((article) => (
                    <GalleryCard
                      key={article._id.toString()}
                      article={article}
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
      </div>
    </>
  );
};

export default AllGalleriesPageContent;

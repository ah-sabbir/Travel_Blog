"use client";

import { formatShortDate } from "@/lib/format-date";
import { FC, useEffect, useState } from "react";
import { ArticleEntity } from "@/entities/article.entity";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "react-loading-skeleton/dist/skeleton.css";
import ArticleCard from "../article-card";
import Skeleton from "react-loading-skeleton";
import { getAllArticlesWithPagination } from "@/lib/fetch-article-data";

interface Props {}

const AllArticlesPageContent: FC<Props> = (props): JSX.Element => {
  const [articles, setArticles] = useState<ArticleEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [numberOfResults, setNumberOfResults] = useState(0);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const data = await getAllArticlesWithPagination(currentPage, 6);
      setArticles(data?.articles || []);
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
        <div className="pt-28 mx-4">
          <h1 className="sub-page-heading">
            Tất cả bài viết{" "}
            <span className="text-[45px] max-[1130px]:text-[40px] max-[550px]:text-[32px]">
              ({numberOfResults})
            </span>
          </h1>
          <p className="sub-page-sub-heading">
            Từ ngày 03/11/2023 đến {formatShortDate(new Date().toDateString())}
          </p>
        </div>
      </div>

      <div className="container mt-[30px]">
        {isLoading ? (
          <div className="cards-grid">
            {[...Array(6).keys()].map((item) => (
              <Skeleton className="w-full aspect-[0.755]" key={item} />
            ))}
          </div>
        ) : (
          <>
            {articles && articles?.length > 0 ? (
              <div>
                <div className="cards-grid">
                  {articles?.map((article) => (
                    <ArticleCard
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
                    previousLabel="Trước"
                    nextLabel="Sau"
                  />
                </div>
              </div>
            ) : (
              <p>Không tìm thấy bài viết nào</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllArticlesPageContent;

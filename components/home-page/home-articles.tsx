"use client";

import { ArticleEntity } from "@/entities/article.entity";
import { getAllArticlesWithPagination } from "@/lib/fetch-article-data";
import { FC, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "react-loading-skeleton/dist/skeleton.css";
import ArticleCard from "../article-card";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { path } from "@/constant";

interface Props {}

const HomeArticles: FC<Props> = (): JSX.Element => {
  const [articles, setArticles] = useState<ArticleEntity[]>();
  const [currentPage, setCurrentPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const data = await getAllArticlesWithPagination(currentPage, 6);
      setArticles(data?.articles || []);
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
          Trải nghiệm của tôi
        </h4>

        <Link
          href={`${path.allArticles}`}
          className="font-bold underline max-[500px]:mb-6 max-[500px]:block"
        >
          Xem tất cả
        </Link>
      </div>
      <>
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
              <p>Không tìm thấy bài viết nào</p>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default HomeArticles;

import { ArticleEntity } from "@/entities/article.entity";
import { getArticlesOfCategory } from "@/lib/fetch-article-data";
import { FC, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "react-loading-skeleton/dist/skeleton.css";
import ArticleCard from "../article-card";
import Skeleton from "react-loading-skeleton";

interface Props {
  categoryId: string | undefined;
}

const CategoryArticles: FC<Props> = ({ categoryId }): JSX.Element => {
  const [articles, setArticles] = useState<ArticleEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    if (!categoryId) {
      return;
    }

    setIsLoading(true);
    const data = await getArticlesOfCategory(categoryId, currentPage, 6);
    setArticles(data?.articles || []);
    setTotalPages(data?.totalPages || 1);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, [categoryId, currentPage]);

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
            {articles && articles?.length > 0 ? (
              <div>
                <div className="grid grid-cols-3 gap-6">
                  {articles?.map((article) => (
                    <ArticleCard
                      key={article._id.toString()}
                      article={article}
                    />
                  ))}
                </div>
                <div className="w-fit pagination pt-12 mx-auto">
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

export default CategoryArticles;

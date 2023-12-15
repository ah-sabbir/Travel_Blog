import { ArticleEntity } from "@/entities/article.entity";
import { getSearchResults } from "@/lib/fetch-article-data";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "react-loading-skeleton/dist/skeleton.css";
import ArticleCard from "../article-card";
import Skeleton from "react-loading-skeleton";

interface Props {
  query: string | null;
  setTotalResults: Dispatch<SetStateAction<number>>;
}

const ArticleResults: FC<Props> = ({ query, setTotalResults }): JSX.Element => {
  const [articles, setArticles] = useState<ArticleEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    if (!query || !query.trim()) {
      return;
    }

    setIsLoading(true);
    const data = await getSearchResults(query, currentPage, 6);
    setArticles(data?.articles || []);
    setTotalPages(data?.totalPages || 1);
    setTotalResults(data?.numberOfResults || 0);
    setIsLoading(false);
  };

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
            {articles && articles?.length > 0 ? (
              <div>
                <div className="grid grid-cols-3 container gap-6">
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
      </>
    </div>
  );
};

export default ArticleResults;

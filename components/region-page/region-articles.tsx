import { ArticleEntity } from "@/entities/article.entity";
import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ArticleCard from "../article-card";
import { getNestedDataOfRegion } from "@/lib/fetch-region-data";

interface Props {
  slug: string | undefined;
}

const RegionArticles: FC<Props> = ({ slug }): JSX.Element => {
  const [articles, setArticles] = useState<ArticleEntity[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = async () => {
    setIsLoading(true);
    const data = await getNestedDataOfRegion(
      slug || "",
      "articles",
      "articles",
      "thumbnail updatedAt name slug description",
      "20"
    );
    setIsLoading(false);
    setArticles(data?.region?.articles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-6">
      {isLoading ? (
        <>
          {[...Array(12).keys()].map((item) => (
            <Skeleton className="w-full aspect-[0.755]" key={item} />
          ))}
        </>
      ) : (
        <>
          {articles && articles?.length > 0 ? (
            articles?.map((article) => (
              <ArticleCard key={article._id.toString()} article={article} />
            ))
          ) : (
            <p>Chưa có bài viết nào</p>
          )}
        </>
      )}
    </div>
  );
};

export default RegionArticles;

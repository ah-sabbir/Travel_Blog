import { ArticleEntity } from "@/entities/article.entity";
import { getNestedDataOfCountry } from "@/lib/fetch-country-data";
import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ArticleCard from "../article-card";

interface Props {
  slug: string | undefined;
}

const CountryArticles: FC<Props> = ({ slug }): JSX.Element => {
  const [articles, setArticles] = useState<ArticleEntity[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = async () => {
    setIsLoading(true);
    const articles = await getNestedDataOfCountry(
      slug || "",
      "articles",
      "articles",
      "thumbnail updatedAt name slug description",
      "20"
    );
    setIsLoading(false);
    setArticles(articles?.articles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-6">
      {" "}
      {isLoading ? (
        <>
          {[...Array(12).keys()].map((item) => (
            <Skeleton className="w-full aspect-[0.755]" key={item} />
          ))}
        </>
      ) : (
        <>
          {articles?.map((article) => (
            <ArticleCard key={article._id.toString()} article={article} />
          ))}
        </>
      )}
    </div>
  );
};

export default CountryArticles;

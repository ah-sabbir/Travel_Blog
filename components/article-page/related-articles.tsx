"use client";

import { getRelatedArticles } from "@/lib/fetch-article-data";
import { FC, useEffect, useState } from "react";
import ArticleCard from "../article-card";
import { RelatedArticle } from "@/dtos/article/get-related-articles.dto";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  categorySlug: string;
  articleId: string;
}

const RelatedArticles: FC<Props> = ({
  categorySlug,
  articleId,
}): JSX.Element => {
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const articles = await getRelatedArticles(categorySlug, articleId);
      setIsLoading(false);
      setRelatedArticles(articles as RelatedArticle[]);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="mt-5 grid grid-cols-3 gap-6">
      {isLoading ? (
        <>
          {[...Array(3).keys()].map((item) => (
            <Skeleton key={item} className="w-full aspect-[0.777]" inline />
          ))}
        </>
      ) : (
        <>
          {relatedArticles.map((article) => (
            <ArticleCard article={article} key={article._id.toString()} />
          ))}
        </>
      )}
    </div>
  );
};

export default RelatedArticles;

"use client";

import { ArticleEntity } from "@/entities/article.entity";
import { getRelatedArticles } from "@/lib/fetch-article-data";
import { FC, useEffect, useState } from "react";

interface Props {
  categorySlug: string;
}

const RelatedArticles: FC<Props> = ({ categorySlug }): JSX.Element => {
  const [relatedArticles, setRelatedArticles] = useState<ArticleEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const articles = await getRelatedArticles(categorySlug);
      setIsLoading(false);
      setRelatedArticles(articles as ArticleEntity[]);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return <div className="mt-10 container"></div>;
};

export default RelatedArticles;

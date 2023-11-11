"use client";

import { FC } from "react";
import parse from "html-react-parser";
import { ArticleEntity } from "@/entities/article.entity";

interface Props {
  article: ArticleEntity | undefined;
}

const ArticleContent: FC<Props> = ({ article }): JSX.Element => {
  return <div className="container">{parse(article?.content as string)}</div>;
};

export default ArticleContent;

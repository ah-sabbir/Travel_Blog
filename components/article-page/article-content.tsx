import { ArticleEntity } from "@/entities/article.entity";
import parse from "html-react-parser";
import { FC } from "react";

interface Props {
  article: ArticleEntity | undefined;
}

const ArticleContent: FC<Props> = ({ article }): JSX.Element => {
  return <div>{parse(article?.content as string)}</div>;
};

export default ArticleContent;

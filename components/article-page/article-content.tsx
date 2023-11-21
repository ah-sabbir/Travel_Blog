import { GetArticleBySlugOutput } from "@/dtos/article/get-article-by-slug.dto";
import parse from "html-react-parser";
import { FC } from "react";

interface Props {
  article: GetArticleBySlugOutput["article"] | undefined;
}

const ArticleContent: FC<Props> = ({ article }): JSX.Element => {
  return <div>{parse(article?.content as string)}</div>;
};

export default ArticleContent;

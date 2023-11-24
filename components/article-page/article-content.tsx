import { GetArticleBySlugOutput } from "@/dtos/article/get-article-by-slug.dto";
import parse from "html-react-parser";
import { FC } from "react";

interface Props {
  content: string | undefined;
}

const ArticleContent: FC<Props> = ({ content }): JSX.Element => {
  return <>{parse(content as string)}</>;
};

export default ArticleContent;

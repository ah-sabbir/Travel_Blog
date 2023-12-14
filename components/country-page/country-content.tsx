import { FC } from "react";
import ArticleContent from "../article-page/article-content";

interface Props {
  content: string | undefined;
}

const CountryContent: FC<Props> = ({ content }): JSX.Element => {
  return (
    <div className="page-content content">
      <ArticleContent content={content} />
    </div>
  );
};

export default CountryContent;

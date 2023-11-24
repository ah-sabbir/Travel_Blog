import { FC } from "react";
import ArticleContent from "../article-page/article-content";

interface Props {
  content: string | undefined;
}

const CountryContent: FC<Props> = ({ content }): JSX.Element => {
  return (
    <div className="content prose prose-img:w-full prose-h2:text-admin_primary prose-h2:font-extrabold prose-h3:font-extrabold text-justify">
      <ArticleContent content={content} />
    </div>
  );
};

export default CountryContent;

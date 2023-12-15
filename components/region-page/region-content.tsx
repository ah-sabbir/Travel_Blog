import { FC } from "react";
import ArticleContent from "../article-page/article-content";

interface Props {
  content: string | undefined;
}

const RegionContent: FC<Props> = ({ content }): JSX.Element => {
  return (
    <div className="content page-content">
      <ArticleContent content={content} />
    </div>
  );
};

export default RegionContent;

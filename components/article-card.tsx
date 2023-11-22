import { FC } from "react";

interface Props {
  article: {
    updatedAt: string;
    name: string;
    description: string;
    author: { name: string };
    slug: string;
    thumbnail: { public_url: string; url: string };
  };
}

const ArticleCard: FC<Props> = (props): JSX.Element => {
  return <div>ArticleCard</div>;
};

export default ArticleCard;

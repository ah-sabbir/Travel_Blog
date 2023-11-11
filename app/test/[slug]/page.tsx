import ArticleContent from "@/components/article-page/article-content";
import { getArticleBySlug } from "@/lib/fetch-article-data";
import { NextPage } from "next";

interface Props {
  params: { slug: string };
}

const ArticlePage: NextPage<Props> = async ({ params }) => {
  const article = await getArticleBySlug(params.slug);

  return (
    <div className="container my-10 flex items-center">
      <div className="article-content w-[65%]">
        <ArticleContent article={article} />
      </div>
    </div>
  );
};

export default ArticlePage;

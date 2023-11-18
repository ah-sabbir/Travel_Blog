import ArticleContent from "@/components/article-page/article-content";
import { getArticleBySlug } from "@/lib/fetch-article-data";
import { NextPage } from "next";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const article = await getArticleBySlug(params.slug);
  return (
    <div>
      <ArticleContent article={article} />
    </div>
  );
};

export default Page;

import ArticleContent from "@/components/article-page/article-content";
import { getArticleBySlug } from "@/lib/fetch-article-data";
import { NextPage } from "next";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const article = await getArticleBySlug(params.slug);
  return (
    <div className="container mt-16 flex">
      <div className="w-[65%] prose prose-img:w-full">
        <ArticleContent article={article} />
      </div>
    </div>
  );
};

export default Page;

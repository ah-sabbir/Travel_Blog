import ArticleContent from "@/components/article-page/article-content";
import ArticleSocialShare from "@/components/article-page/article-social-share";
import RelatedArticles from "@/components/article-page/related-articles";
import TOC from "@/components/article-page/toc";
import BtnWithIcon from "@/components/btn-with-icon";
import Comments from "@/components/comments";
import NextImage from "@/components/next-image";
import { path } from "@/constant";
import { getArticleBySlug } from "@/lib/fetch-article-data";
import { formatLongDate } from "@/lib/format-date";
import { NextPage } from "next";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { FcAlarmClock } from "react-icons/fc";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const article = await getArticleBySlug(params.slug);

  return (
    <>
      <div className="page-cover bubble-mask">
        <div className="relative w-full h-full">
          <NextImage
            src={article?.thumbnail.url || ""}
            alt={article?.name || ""}
            priority
          />
        </div>
      </div>
      <div className="container flex">
        <div className="mt-20 w-[45%]">
          <div className="flex items-center gap-2">
            <BtnWithIcon
              icon={FaAngleLeft}
              content=""
              customClasses="grid place-items-center h-[28px] w-[28px] !p-0 !rounded-full before:!rounded-full !text-sm"
              to="/"
            />

            {article?.country?.name && (
              <BtnWithIcon
                to={`${path.country}${article.country.slug}`}
                content={article.country.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}

            {article?.region?.name && (
              <BtnWithIcon
                to={`${path.region}${article.region.slug}`}
                content={article.region.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}
          </div>

          <h1 className="text-black_text font-black text-3xl my-8 leading-10 tracking-wide font-arima">
            {article?.name}
          </h1>

          <p className="text-sm flex items-center gap-1 mb-2">
            <FcAlarmClock />{" "}
            <span>
              Đã đăng:{" "}
              <strong>{formatLongDate(article?.createdAt || "")}</strong>
            </span>
          </p>

          <div className="flex items-center gap-4 text-sm flex-wrap">
            <span>
              Bởi{" "}
              <Link
                href=""
                className="underline font-extrabold text-admin_primary"
              >
                {article?.author?.name}
              </Link>
            </span>

            {article?.category?.name && (
              <span>
                Danh mục:{" "}
                <Link
                  href={`${path.category}${article.category.slug}`}
                  className="underline font-extrabold text-admin_primary"
                >
                  {article.category.name}
                </Link>
              </span>
            )}

            {article?.interest?.name && (
              <span>
                Sở thích:{" "}
                <Link
                  href={`${path.interest}${article.interest.slug}`}
                  className="underline font-extrabold text-admin_primary"
                >
                  {article.interest.name}
                </Link>
              </span>
            )}
          </div>

          <hr className="mt-6 mb-4" />

          <p className="leading-8 text-justify">{article?.description}</p>
        </div>

        <div className="h-[550px]"></div>
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-[0.9fr,0.4fr] gap-10 mt-12">
        <div className="content prose prose-img:w-full prose-h2:text-admin_primary prose-h2:font-extrabold prose-h3:font-extrabold text-justify">
          <ArticleContent content={article?.content} />

          <div className="mt-10">
            <p className="italic mx-auto w-fit border-b text-admin_gray_text">
              Chia sẻ ngay để mọi người cùng đọc
            </p>
            <ArticleSocialShare
              slug={article?.slug || ""}
              title={article?.name || ""}
            />
          </div>
        </div>
        <TOC selector=".content" />
      </div>

      <div className="container mt-16">
        <p className="font-bold text-2xl text-admin_primary">
          Bài viết cùng danh mục &quot;{article?.category.name}&quot;
        </p>
        <RelatedArticles
          categorySlug={article?.category.slug || ""}
          articleId={article?._id || ""}
        />
      </div>

      <div className="small-container mt-14 comments">
        <Comments article={article} />
      </div>

      <div className="small-container text-admin_gray_text mt-14">
        <p className="italic my-0">
          Bài viết được cập nhật lần cuối vào:{" "}
          {formatLongDate(article?.updatedAt || "")}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <p className="italic my-0">Các chủ đề liên quan:</p>

          <div className="flex items-center gap-2">
            {article?.country?.name && (
              <BtnWithIcon
                to=""
                content={article.country.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}

            {article?.region?.name && (
              <BtnWithIcon
                to=""
                content={article.region.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}

            {article?.category?.name && (
              <BtnWithIcon
                to=""
                content={article.category.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}

            {article?.interest?.name && (
              <BtnWithIcon
                to=""
                content={article.interest.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

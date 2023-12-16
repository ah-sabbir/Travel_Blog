import ArticleContent from "@/components/article-page/article-content";
import ArticleSocialShare from "@/components/article-page/article-social-share";
import RelatedArticles from "@/components/article-page/related-articles";
import TOC from "@/components/article-page/toc";
import BtnWithIcon from "@/components/btn-with-icon";
import Comments from "@/components/comments";
import NextImage from "@/components/next-image";
import { path, websiteName } from "@/constant";
import { getArticleBySlug } from "@/lib/fetch-article-data";
import { formatLongDate } from "@/lib/format-date";
import { NextPage } from "next";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { FcAlarmClock } from "react-icons/fc";
import slugify from "slugify";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const article = await getArticleBySlug(params.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article?.name,
    image: article?.thumbnail.url,
    author: article?.author.name,
    genre: article?.category.name,
    publisher: websiteName,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/bai-viet/${params.slug}`,
    datePublished: new Date(article?.createdAt || "").toISOString(),
    dateCreated: new Date(article?.createdAt || "").toISOString(),
    dateModified: new Date(article?.updatedAt || "").toISOString(),
    description: article?.description,
    articleBody: article?.content,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="page-cover bubble-mask">
        <div className="relative w-full h-full">
          <NextImage
            src={article?.thumbnail.url || ""}
            alt={article?.name || ""}
            priority
          />
        </div>
      </div>
      <div className="container flex max-[1250px]:block">
        <div className="mt-20 w-[43%] max-[1250px]:w-full max-[1250px]:mt-10">
          <div className="flex items-center gap-2 flex-wrap">
            <BtnWithIcon
              icon={FaAngleLeft}
              content=""
              customClasses="grid place-items-center h-[28px] w-[28px] !p-0 !rounded-full before:!rounded-full !text-sm"
              to={path.allArticles}
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

          <div className="flex items-center gap-x-4 gap-y-2 text-sm flex-wrap">
            <span>
              Bởi{" "}
              <Link
                href={`${path.author}${slugify(article?.author?.name || "", {
                  lower: true,
                })}`}
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

        <div className="h-[550px] max-[1250px]:hidden"></div>
      </div>

      <div className="container flex gap-10 mt-12 max-[1000px]:flex-col-reverse">
        <div className="content page-content">
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
        <div className="flex-1 max-[1000px]:w-full">
          <TOC selector=".content" />
        </div>
      </div>

      <div className="container mt-16">
        <p className="font-bold text-2xl text-admin_primary mb-3">
          Bài viết cùng danh mục &quot;{article?.category.name}&quot;
        </p>
        <RelatedArticles
          categorySlug={article?.category.slug || ""}
          articleId={article?._id || ""}
        />
      </div>

      <div className="container mt-14 comments">
        <Comments article={article} />
      </div>

      <div className="container text-admin_gray_text mt-14">
        <p className="italic my-0">
          Bài viết được cập nhật lần cuối vào:{" "}
          {formatLongDate(article?.updatedAt || "")}
        </p>

        <div className="flex items-center gap-2 mt-3 max-[700px]:block">
          <p className="italic my-0 max-[700px]:mb-2">Các chủ đề liên quan:</p>

          <div className="flex items-center gap-2 flex-wrap">
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

            {article?.category?.name && (
              <BtnWithIcon
                to={`${path.category}${article.category.slug}`}
                content={article.category.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}

            {article?.interest?.name && (
              <BtnWithIcon
                to={`${path.interest}${article.interest.slug}`}
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

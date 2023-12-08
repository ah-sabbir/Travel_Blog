import ArticleSocialShare from "@/components/article-page/article-social-share";
import BtnWithIcon from "@/components/btn-with-icon";
import Comments from "@/components/comments";
import GalleryContent from "@/components/gallery-page/gallery-content";
import RelatedGalleries from "@/components/gallery-page/related-galleries";
import NextImage from "@/components/next-image";
import { path } from "@/constant";
import { getGalleryBySlug } from "@/lib/fetch-gallery-data";
import { formatLongDate } from "@/lib/format-date";
import { NextPage } from "next";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { FcAlarmClock } from "react-icons/fc";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const gallery = await getGalleryBySlug(params.slug);

  return (
    <>
      <div className="page-cover bubble-mask">
        <div className="relative w-full h-full">
          <NextImage
            src={gallery?.thumbnail.url || ""}
            alt={gallery?.name || ""}
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

            {gallery?.country?.name && (
              <BtnWithIcon
                to={`${path.country}${gallery.country.slug}`}
                content={gallery.country.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}

            {gallery?.region?.name && (
              <BtnWithIcon
                to={`${path.region}${gallery.region.slug}`}
                content={gallery.region.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}

            {gallery?.destination?.name && (
              <BtnWithIcon
                to={`${path.destination}${gallery.destination.slug}`}
                content={gallery.destination.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}
          </div>

          <h1 className="text-black_text font-black text-3xl my-8 leading-10 tracking-wide font-arima">
            {gallery?.name}
          </h1>

          <p className="text-sm flex items-center gap-1 mb-2">
            <FcAlarmClock />{" "}
            <span>
              Đã đăng:{" "}
              <strong>{formatLongDate(gallery?.createdAt || "")}</strong>
            </span>
          </p>

          <div className="flex items-center gap-4 text-sm flex-wrap">
            <span>
              Bởi{" "}
              <Link
                href=""
                className="underline font-extrabold text-admin_primary"
              >
                {gallery?.author?.name}
              </Link>
            </span>

            {gallery?.category?.name && (
              <span>
                Danh mục:{" "}
                <Link
                  href={`${path.category}${gallery.category.slug}`}
                  className="underline font-extrabold text-admin_primary"
                >
                  {gallery.category.name}
                </Link>
              </span>
            )}

            {gallery?.interest?.name && (
              <span>
                Sở thích:{" "}
                <Link
                  href={`${path.interest}${gallery.interest.slug}`}
                  className="underline font-extrabold text-admin_primary"
                >
                  {gallery.interest.name}
                </Link>
              </span>
            )}
          </div>

          <hr className="mt-6 mb-4" />

          <p className="leading-8 text-justify">{gallery?.description}</p>
        </div>

        <div className="h-[550px]"></div>
      </div>

      <div className="container mt-14 mb-10">
        <div className="content prose prose-img:w-full prose-figure:!mb-8">
          <GalleryContent content={gallery?.imagesContent} />

          <div className="mt-10">
            <p className="italic mx-auto w-fit border-b text-admin_gray_text">
              Chia sẻ ngay để mọi người cùng xem
            </p>
            <ArticleSocialShare
              slug={gallery?.slug || ""}
              title={gallery?.name || ""}
            />
          </div>
        </div>
      </div>

      <div className="container mt-16">
        <p className="font-bold text-2xl text-admin_primary">
          Đón xem các thư viện ảnh khác
        </p>
        <RelatedGalleries
          countryId={gallery?.country._id.toString() || ""}
          galleryId={gallery?._id.toString() || ""}
        />
      </div>

      <div className="container mt-14 comments">
        <Comments gallery={gallery} />
      </div>

      <div className="container text-admin_gray_text mt-14">
        <p className="italic my-0">
          Thư viện ảnh được cập nhật lần cuối vào:{" "}
          {formatLongDate(gallery?.updatedAt || "")}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <p className="italic my-0">Các chủ đề liên quan:</p>

          <div className="flex items-center gap-2">
            {gallery?.country?.name && (
              <BtnWithIcon
                to={`${path.country}${gallery.country.slug}`}
                content={gallery.country.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}

            {gallery?.region?.name && (
              <BtnWithIcon
                to={`${path.region}${gallery.region.slug}`}
                content={gallery.region.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}

            {gallery?.category?.name && (
              <BtnWithIcon
                to={`${path.category}${gallery.category.slug}`}
                content={gallery.category.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}

            {gallery?.interest?.name && (
              <BtnWithIcon
                to={`${path.interest}${gallery.interest.slug}`}
                content={gallery.interest.name}
                customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
              />
            )}

            {gallery?.destination?.name && (
              <BtnWithIcon
                to={`${path.destination}${gallery.destination.slug}`}
                content={gallery.destination.name}
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

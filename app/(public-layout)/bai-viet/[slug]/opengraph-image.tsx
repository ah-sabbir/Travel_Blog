/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";
import { getArticleBySlug } from "@/lib/fetch-article-data";
import moment from "moment";
import "moment/locale/vi";

export const size = {
  width: 1200,
  height: 630,
};
export const alt = "River Lee's Blog";
export const contentType = "image/png";

export default async function og({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // Get Data from CMS
  const article = await getArticleBySlug(slug);

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0">
          <img
            tw="flex flex-1 object-cover w-full h-full object-center"
            src={article?.thumbnail?.url}
            alt={article?.name!!}
          />
          {/* Overlay */}
          <div tw="absolute flex inset-0 bg-black bg-opacity-50" />
        </div>
        <div tw="flex flex-col text-neutral-50 ">
          {/* Title */}
          <div tw="text-[60px]">{article?.name}</div>
          {/* Description */}
          <div tw="text-2xl max-w-4xl">{article?.description}</div>
          {/* Tags */}
          <div tw="flex mt-6 flex-wrap items-center text-3xl text-neutral-200">
            <div tw="font-medium text-emerald-600">
              {article?.category.name}
            </div>
            <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300 " />
            <div>{`${article?.author?.name}`}</div>
            <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300" />
            <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300" />
            <div> {moment(article?.createdAt).format("DD/MM/YYYY")}</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

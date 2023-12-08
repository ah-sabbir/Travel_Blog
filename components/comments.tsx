"use client";

import { GetArticleBySlugOutput } from "@/dtos/article/get-article-by-slug.dto";
import { GalleryEntity } from "@/entities/gallery.entity";
import { DiscussionEmbed } from "disqus-react";
import { FC } from "react";

interface Props {
  article?: GetArticleBySlugOutput["article"] | undefined;
  gallery?: GalleryEntity;
}

const Comments: FC<Props> = ({ article, gallery }): JSX.Element => {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const disqusConfig = {
    url: pageUrl,
    identifier: article?.slug || gallery?.slug,
    title: article?.name || gallery?.name,
  };
  return (
    <DiscussionEmbed shortname="dulich4phuong-com" config={disqusConfig} />
  );
};

export default Comments;

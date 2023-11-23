"use client";

import { GetArticleBySlugOutput } from "@/dtos/article/get-article-by-slug.dto";
import { DiscussionEmbed } from "disqus-react";
import { FC } from "react";

interface Props {
  article: GetArticleBySlugOutput["article"] | undefined;
}

const Comments: FC<Props> = ({ article }): JSX.Element => {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const disqusConfig = {
    url: pageUrl,
    identifier: article?.slug,
    title: article?.name,
  };
  return (
    <DiscussionEmbed shortname="dulich4phuong-com" config={disqusConfig} />
  );
};

export default Comments;

"use client";

import { FC } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
} from "next-share";
import SocialShareBtn from "./social-share-btn";
import { path } from "@/constant";

interface Props {
  object: any;
  isArticle?: boolean;
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const ArticleSocialShare: FC<Props> = ({ object, isArticle }): JSX.Element => {
  const url = isArticle
    ? `${baseURL}${path.article}${object.slug}`
    : `${baseURL}${path.gallery}${object.slug}`;

  return (
    <div className="grid grid-cols-5 max-[1200px]:grid-cols-4 max-[1000px]:grid-cols-5 max-[820px]:grid-cols-4 max-[655px]:grid-cols-3 max-[505px]:grid-cols-2 max-[340px]:grid-cols-1 gap-4 w-full">
      <FacebookShareButton url={url} quote={object.name}>
        <SocialShareBtn title="Facebook" color="#404f89" subColor="#475899" />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={object.name}>
        <SocialShareBtn title="Twitter" color="#5d9ad7" subColor="#68abef" />
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={object.name}>
        <SocialShareBtn title="Linkedin" color="#446ea3" subColor="#4c7bb5" />
      </LinkedinShareButton>

      <PinterestShareButton
        url={url}
        description={object.name}
        media={object.thumbnail.url}
      >
        <SocialShareBtn title="Pinterest" color="#9b1f15" subColor="#ad2217" />
      </PinterestShareButton>

      <RedditShareButton url={url} title={object.name}>
        <SocialShareBtn title="Reddit" color="#d94800" subColor="#c74200" />
      </RedditShareButton>
    </div>
  );
};

export default ArticleSocialShare;

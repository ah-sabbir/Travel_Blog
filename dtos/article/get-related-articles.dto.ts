import { CoreOutput } from "../common.dto";

export interface RelatedArticle {
  _id: string;
  updatedAt: string;
  name: string;
  description: string;
  author: { name: string };
  slug: string;
  thumbnail: { public_url: string; url: string };
}

export interface GetRelatedArticlesOutput extends CoreOutput {
  articles: RelatedArticle[];
}

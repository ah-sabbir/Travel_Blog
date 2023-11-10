import { ArticleEntity } from "@/entities/article.entity";

export interface CreateArticleInput
  extends Pick<ArticleEntity, "name" | "slug" | "description" | "content"> {
  thumbnail: string;
  interestId?: string;
  categoryId?: string;
  countryId?: string;
  regionId?: string;
  authorId: string;
}

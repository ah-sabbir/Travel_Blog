import { CoreEntity } from "../common.dto";
import { ArticleEntity } from "@/entities/article.entity";

export interface GetArticleBySlugOutput extends CoreEntity {
  article: ArticleEntity;
}

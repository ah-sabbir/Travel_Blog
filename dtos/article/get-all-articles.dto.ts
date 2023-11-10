import { ArticleEntity } from "@/entities/article.entity";
import { CoreOutput } from "../common.dto";

export interface GetAllArticleOutput extends CoreOutput {
  articles: ArticleEntity[];
}

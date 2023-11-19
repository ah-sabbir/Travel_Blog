import { ArticleEntity } from "@/entities/article.entity";
import { CoreOutput } from "../common.dto";

export interface GetAllArticlesOutput extends CoreOutput {
  articles: ArticleEntity[];
}

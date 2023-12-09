import { ArticleEntity } from "@/entities/article.entity";
import { CoreOutput } from "../common.dto";

export interface GetArticleResultsOutput extends CoreOutput {
  articles?: ArticleEntity[];
  totalPages?: number;
  numberOfResults?: number;
}

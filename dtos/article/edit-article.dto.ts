import { CreateArticleInput } from "./create-article.dto";

export interface EditArticleInput extends CreateArticleInput {
  articleId: string;
}

import { CoreOutput } from "../common.dto";

export interface GetArticleBySlugOutput extends CoreOutput {
  article: {
    thumbnail: {
      public_id: string;
      url: string;
    };
    _id: string;
    name: string;
    description: string;
    slug: string;
    views: number;
    author: {
      _id: string;
      name: string;
    };
    comments: any[]; // Assuming comments can be an array of any type
    interest: {
      _id: string;
      name: string;
      slug: string;
    };
    region: {
      _id: string;
      name: string;
      slug: string;
    };
    country: {
      _id: string;
      name: string;
      slug: string;
    };
    category: {
      _id: string;
      name: string;
      slug: string;
    };
    destination: {
      _id: string;
      name: string;
      slug: string;
    };
    content: string;
    updatedAt: string;
  };
}

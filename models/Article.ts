import mongoose, { Schema, models } from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    slug: {
      type: String,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },

    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
    },

    interest: {
      type: Schema.Types.ObjectId,
      ref: "Interest",
    },

    region: {
      type: Schema.Types.ObjectId,
      ref: "Region",
    },

    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Article = models.Article || mongoose.model("Article", ArticleSchema);

export default Article;

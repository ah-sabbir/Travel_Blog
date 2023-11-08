import mongoose, { Schema } from "mongoose";

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

    image: {
      public_id: {
        type: String,
        //  required: true
      },
      url: {
        type: String,
        // required: true
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

const Article = mongoose.model("Article", ArticleSchema);

export default Article;

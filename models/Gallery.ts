import mongoose, { Schema, models } from "mongoose";

const GallerySchema = new mongoose.Schema(
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

    credit: {
      type: String,
    },

    views: {
      type: Number,
      default: 0,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },

    destination: {
      type: Schema.Types.ObjectId,
      ref: "Destination",
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

    country: {
      type: Schema.Types.ObjectId,
      ref: "Region",
    },

    imagesContent: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Gallery = models.Gallery || mongoose.model("Gallery", GallerySchema);

export default Gallery;

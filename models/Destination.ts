import mongoose, { Schema, models } from "mongoose";

const DestinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  slug: {
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

  images: { type: [String] },

  views: {
    type: Number,
    default: 0,
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

  address: {
    type: String,
    required: true,
  },

  instruction: {
    type: String,
  },

  articles: {
    type: [Schema.Types.ObjectId],
    ref: "Article",
  },

  galleries: {
    type: [Schema.Types.ObjectId],
    ref: "Gallery",
  },

  comments: {
    type: [Schema.Types.ObjectId],
    ref: "Comment",
  },

  content: {
    type: String,
    required: true,
  },
});

const Destination =
  models.Destination || mongoose.model("Destination", DestinationSchema);

export default Destination;

import mongoose, { Schema, models } from "mongoose";

const RegionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  slug: { type: String, required: true, unique: true },

  description: { type: String, required: true },

  thumbnail: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  banner: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  articles: {
    type: [Schema.Types.ObjectId],
    ref: "Article",
  },

  galleries: {
    type: [Schema.Types.ObjectId],
    ref: "Gallery",
  },

  tickets: {
    type: [Schema.Types.ObjectId],
    ref: "Ticket",
  },

  destination: {
    type: [Schema.Types.ObjectId],
    ref: "Destinations",
  },

  country: {
    type: String,
  },

  views: {
    type: Number,
  },

  content: {
    type: String,
  },
});

const Region = models.Region || mongoose.model("Region", RegionSchema);

export default Region;

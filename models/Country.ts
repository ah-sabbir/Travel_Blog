import mongoose, { Schema, models } from "mongoose";

const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
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

  articles: {
    type: [Schema.Types.ObjectId],
    ref: "Article",
  },

  galleries: {
    type: [Schema.Types.ObjectId],
    ref: "Gallery",
  },

  destinations: {
    type: [Schema.Types.ObjectId],
    ref: "Destinations",
  },

  regions: {
    type: [Schema.Types.ObjectId],
    ref: "Region",
  },

  views: {
    type: Number,
    default: 0,
  },

  content: {
    type: String,
    required: true,
  },
});

const Country = models.Country || mongoose.model("Country", CountrySchema);

export default Country;

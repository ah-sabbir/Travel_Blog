import mongoose, { Schema, models } from "mongoose";

const InterestSchema = new mongoose.Schema({
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
    unique: true,
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
    ref: "Destination",
  },
});

const Interest = models.Interest || mongoose.model("Interest", InterestSchema);

export default Interest;

import mongoose, { Schema } from "mongoose";

const RegionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  content: {
    type: String,
  },
});

const Region = mongoose.model("Region", RegionSchema);

export default Region;

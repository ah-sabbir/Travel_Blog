import mongoose, { Schema } from "mongoose";

const InterestSchema = new mongoose.Schema({
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
});

const Interest = mongoose.model("Interest", InterestSchema);

export default Interest;

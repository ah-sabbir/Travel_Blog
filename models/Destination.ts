import mongoose, { Schema } from "mongoose";

const DestinationSchema = new mongoose.Schema({
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

  views: {
    type: Number,
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

const Destination = mongoose.model("Course", DestinationSchema);

export default Destination;

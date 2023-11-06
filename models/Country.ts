import mongoose, { Schema } from "mongoose";

const CountrySchema = new mongoose.Schema({
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

  articles: {
    type: [Schema.Types.ObjectId],
    ref: "Article",
  },

  galleries: {
    type: [Schema.Types.ObjectId],
    ref: "Gallery",
  },

  destination: {
    type: [Schema.Types.ObjectId],
    ref: "Destinations",
  },
  content: {
    type: String,
  },
});

const Country = mongoose.model("Country", CountrySchema);

export default Country;

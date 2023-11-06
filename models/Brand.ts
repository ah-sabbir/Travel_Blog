import mongoose, { Schema } from "mongoose";

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },

  logo: {
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

  description: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  brandType: { type: [Schema.Types.ObjectId], ref: "BrandType" },
});

const Brand = mongoose.model("Brand", BrandSchema);

export default Brand;

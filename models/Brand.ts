import mongoose, { Schema, models } from "mongoose";

const BrandSchema = new mongoose.Schema({
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

  link: {
    type: String,
    required: true,
  },

  affLink: {
    type: String,
  },

  logo: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  views: {
    type: Number,
    default: 0,
  },

  content: {
    type: String,
    required: true,
  },

  tickets: {
    type: [Schema.Types.ObjectId],
    ref: "Ticket",
  },

  brandType: { type: Schema.Types.ObjectId, ref: "BrandType" },
});

const Brand = models.Brand || mongoose.model("Brand", BrandSchema);

export default Brand;

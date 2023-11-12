import mongoose, { Schema, models } from "mongoose";

const BrandTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  brands: { type: [Schema.Types.ObjectId], ref: "Brand" },
});

const BrandType =
  models.BrandType || mongoose.model("BrandType", BrandTypeSchema);

export default BrandType;

import mongoose, { Schema } from "mongoose";

const BrandTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brands: { type: [Schema.Types.ObjectId], ref: "Brand" },
});

const BrandType = mongoose.model("BrandType", BrandTypeSchema);

export default BrandType;

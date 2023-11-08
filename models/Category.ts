import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
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

const Category = mongoose.model("Category", CategorySchema);

export default Category;

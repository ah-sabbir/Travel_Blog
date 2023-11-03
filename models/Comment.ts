import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  website: {
    type: String,
  },

  content: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Course", CommentSchema);

export default Comment;

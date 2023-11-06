import mongoose, { Schema, models } from "mongoose";

export enum userRole {
  admin = "admin",
  user = "user",
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(userRole),
      default: userRole.user,
    },

    description: {
      type: String,
    },

    articles: {
      type: [Schema.Types.ObjectId],
      ref: "Article",
    },

    galleries: {
      type: [Schema.Types.ObjectId],
      ref: "Gallery",
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);

export default User;

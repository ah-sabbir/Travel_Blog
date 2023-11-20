import mongoose, { Schema, models } from "mongoose";

const RegionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

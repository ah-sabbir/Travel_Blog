import mongoose, { models } from "mongoose";

const subcriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Subcriber =
  models.Subcriber || mongoose.model("Subcriber", subcriberSchema);

export default Subcriber;

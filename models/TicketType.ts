import mongoose, { Schema, models } from "mongoose";

const TicketTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  tickets: { type: [Schema.Types.ObjectId], ref: "Ticket" },
});

const TicketType =
  models.TicketType || mongoose.model("TicketType", TicketTypeSchema);

export default TicketType;

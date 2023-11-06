import mongoose, { Schema } from "mongoose";

const TicketTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tickets: { type: [Schema.Types.ObjectId], ref: "Ticket" },
});

const TicketType = mongoose.model("TicketType", TicketTypeSchema);

export default TicketType;

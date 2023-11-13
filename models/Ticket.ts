import mongoose, { Schema } from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    ticketType: {
      type: Schema.Types.ObjectId,
      ref: "TicketType",
    },

    price: {
      type: String,
      required: true,
    },

    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },

    views: {
      type: Number,
    },

    sku: {
      type: String,
    },

    region: {
      type: Schema.Types.ObjectId,
      ref: "Region",
    },

    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;

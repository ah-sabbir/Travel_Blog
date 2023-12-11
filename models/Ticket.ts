import mongoose, { Schema, models } from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
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

    link: {
      type: String,
      required: true,
    },

    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },

    views: {
      type: Number,
      default: 0,
    },

    images: {
      type: [String],
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

TicketSchema.index({ name: "text" });

const Ticket = models.Ticket || mongoose.model("Ticket", TicketSchema);

export default Ticket;

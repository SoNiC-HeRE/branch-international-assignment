import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Pending", "Resolved"],
      default: "Open",
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: String,
      required: true,
    },
    important: {
      type: Boolean,
      required: true,
      default: false,
    },
    messages: [
      {
        sentBy: {
          type: String,
          enum: ["User", "Staff"],
          default: "User",
        },
        content: {
          type: String,
          required: true,
        },
        sentAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);

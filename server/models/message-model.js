import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  "User ID": { type: Number, required: true }, // Corresponds to "User ID"
  "Timestamp (UTC)": { type: Date, required: true }, // Corresponds to "Timestamp (UTC)"
  "Message Body": { type: String, required: true }, // Corresponds to "Message Body"
  "Agent Response": { type: String, default: "" }, // Optional: Agent's response
});

const Message = mongoose.model("Message", messageSchema);

export default Message;

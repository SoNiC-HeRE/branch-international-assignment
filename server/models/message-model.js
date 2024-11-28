import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId: { type: Number, required: true }, // Corresponds to "User ID"
    timestampUTC: { type: Date, required: true }, // Corresponds to "Timestamp (UTC)"
    messageBody: { type: String, required: true }, // Corresponds to "Message Body"
    agentResponse: { type: String, default: "" }, // Optional: Agent's response
});

const Message = mongoose.model("Message", messageSchema);

export default Message;

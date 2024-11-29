import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  "User ID": { type: String, required: true },
  "Timestamp (UTC)": { type: Date, required: true },
  "Message Body": { type: String, required: true },
  agentResponse: { type: [String], default: [] }, 
});


const Message = mongoose.model("Message", messageSchema);
export default Message;

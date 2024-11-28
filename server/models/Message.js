import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    message: { type: String, required: true },
    agentResponse: { type: String, default: "" },
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
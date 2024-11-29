import express from "express";
import Message from "../models/message-model.js";

const router = express.Router();

// Create a new message
router.post("/", async (req, res) => {
  const { "User ID": userId, "Timestamp (UTC)": timestamp, "Message Body": messageBody } = req.body;

  try {
    const newMessage = new Message({
      "User ID": userId,
      "Timestamp (UTC)": timestamp,
      "Message Body": messageBody,
    });

    await newMessage.save();

    // Emit the new message to all connected clients
    req.io.emit("newMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: `Error saving message: ${error.message}` });
  }
});

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: `Error fetching messages: ${error.message}` });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { agentResponse } = req.body;

  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Append agentResponse
    message.agentResponse = [...(message.agentResponse || []), agentResponse];

    await message.save();

    // Emit the updated message to all clients
    req.io.emit("messageUpdated", message);

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: `Error updating message: ${error.message}` });
  }
});


export default router;

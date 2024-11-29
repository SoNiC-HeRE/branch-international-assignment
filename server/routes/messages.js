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

// Update a message with an agent's response
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { agentResponse } = req.body;

  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { agentResponse },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Emit the updated message to all connected clients
    req.io.emit("messageUpdated", updatedMessage);

    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: `Error updating message: ${error.message}` });
  }
});

export default router;

import express from "express";
import Message from "../models/message-model.js";

const router = express.Router();

// Get user by ID to verify login
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Convert userId to a number using parseInt
    const parsedUserId = parseInt(userId, 10);

    if (isNaN(parsedUserId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    // Query the database for the user
    const userMessages = await Message.find({ "User ID": parsedUserId });

    if (userMessages.length > 0) {
      return res.status(200).json(userMessages); // Return messages for the user
    } else {
      return res.status(404).json({ error: "User not found or no messages for this user" });
    }
  } catch (error) {
    res.status(500).json({ error: `Error fetching messages: ${error.message}` });
  }
});



// Create a new message
router.post("/", async (req, res) => {
  const { "User ID": userId, "Timestamp (UTC)": timestamp, "Message Body": messageBody } = req.body;

  if (!userId || !timestamp || !messageBody) {
    return res.status(400).json({ error: "Missing required fields" });
  }

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

// Update message with agent response
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { agentResponse } = req.body;

  if (!agentResponse || agentResponse.trim().length === 0) {
    return res.status(400).json({ error: "Invalid agent response" });
  }

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

// Update user message in Message Body field
router.patch("/updateMessage/:id", async (req, res) => {
  const { id } = req.params; // Message ID
  const { userMessage } = req.body; // New user message

  if (!userMessage || userMessage.trim().length === 0) {
    return res.status(400).json({ error: "Invalid user message" });
  }

  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Add new user message to Message Body array
    message["Message Body"] = [...(message["Message Body"] || []), userMessage];

    await message.save();

    // Emit the updated message to all clients
    req.io.emit("messageUpdated", message);

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: `Error updating message: ${error.message}` });
  }
});

export default router;

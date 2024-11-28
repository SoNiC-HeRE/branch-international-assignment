import express from "express";
import Message from "../models/message-model.js";

const router = express.Router();

// POST: Add a customer message
router.post("/", async (req, res) => {
  const { userId, timestampUTC, messageBody } = req.body; // Get data from the request body
  try {
    const newMessage = new Message({
      "User ID": userId,
      "Timestamp (UTC)": timestampUTC,
      "Message Body": messageBody,
    });
    await newMessage.save(); // Save the new message to MongoDB
    res.status(201).json(newMessage); // Return the saved message
  } catch (error) {
    res.status(500).json({ error: `Error saving message: ${error.message}` });
  }
});

// GET: Retrieve all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find(); // Fetch all messages from the database
    res.status(200).json(messages); // Return the fetched messages
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error fetching messages: ${error.message}` });
  }
});

// PATCH: Update agent response for a specific message
router.patch("/:id", async (req, res) => {
  const { id } = req.params; // Get the message ID from the URL parameter
  const { messageBody } = req.body; // Get the updated message body from the request body
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { "Message Body": messageBody }, // Update the "Message Body" field
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedMessage); // Return the updated message
  } catch (error) {
    res.status(500).json({ error: `Error updating message: ${error.message}` });
  }
});

export default router;

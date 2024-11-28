import express from "express";
import Message from "../models/message-model.js";

const router = express.Router();

// POST: Add a customer message
router.post("/", async (req, res) => {
    const { userId, timestampUTC, messageBody } = req.body; // Match sample data fields
    try {
        const newMessage = new Message({ userId, timestampUTC, messageBody });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: `Error saving message: ${error.message}` });
    }
});

// GET: Retrieve all messages
router.get("/", async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: `Error fetching messages: ${error.message}` });
    }
});

// PATCH: Update agent response for a specific message
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { agentResponse } = req.body; // Only update agentResponse
    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { agentResponse },
            { new: true } // Return the updated document
        );
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: `Error updating response: ${error.message}` });
    }
});

export default router;

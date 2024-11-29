import express from "express";
import Ticket from "../models/TicketModel.js";

const router = express.Router();

// Create a new ticket
router.post("/create", async (req, res, next) => {
  try {
    const regex = /loan|card|fraud|fees/i;
    const { description, createdBy } = req.body;
    const important = regex.test(description);

    const newTicket = await Ticket.create({
      description,
      createdBy,
      important,
      messages: [{ content: description }],
    });

    res.status(201).json(newTicket);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
});

// Get tickets by createdBy
router.get("/user/:createdBy", async (req, res, next) => {
  try {
    const { createdBy } = req.params;
    const userTickets = await Ticket.find({ createdBy }).sort({
      important: -1,
    });
    res.status(200).json(userTickets);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
});

// Search tickets
router.get("/search", async (req, res, next) => {
  try {
    const { exp } = req.query;
    const tickets = await Ticket.find({
      $or: [
        { description: { $regex: exp, $options: "i" } },
        { createdBy: { $regex: exp, $options: "i" } },
        {
          messages: { $elemMatch: { content: { $regex: exp, $options: "i" } } },
        },
      ],
    }).sort({ important: -1 });

    res.status(200).json(tickets);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
});

// Fetch a single ticket
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
});

// Update a ticket
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, description } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { status, description },
      { new: true, runValidators: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
});

// Delete a ticket
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(204).end(); // No content, successful deletion
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
});

// Get a list of all tickets
router.get("/", async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status: { $regex: status, $options: "i" } } : {};

    const tickets = await Ticket.find(filter).sort({ important: -1 });
    res.status(200).json(tickets);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
});

export default router;

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";
import { Server as socketIo } from "socket.io";
import mongoose from "mongoose";

import ticketRoute from "./routes/ticketRoutes.js";
import Ticket from "./models/TicketModel.js";
import { userJoin, getCurrentUser, userLeave } from "./utils/users.js";

dotenv.config();

const { MONGO_URL, PORT } = process.env;
const app = express();
const server = http.createServer(app);
const io = new socketIo(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// WebSocket logic
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ ticket, userType }) => {
    const user = userJoin(socket.id, ticket, userType);
    socket.join(user.room);

    Ticket.findById(user.room)
      .then((ticket) => ticket && socket.emit("previousChat", ticket.messages))
      .catch((err) => console.error(err));
  });

  socket.on("chatMessage", ({ content }) => {
    const user = getCurrentUser(socket.id);
    const { room: id, userType: sentBy } = user;

    Ticket.findByIdAndUpdate(
      id,
      { $push: { messages: { content, sentBy } } },
      { new: true, runValidators: true }
    )
      .then((updatedTicket) =>
        io.to(user.room).emit("message", updatedTicket.messages)
      )
      .catch((err) => console.error(err));
  });

  socket.on("disconnect", () => {
    userLeave(socket.id);
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Routes
app.use("/ticket", ticketRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

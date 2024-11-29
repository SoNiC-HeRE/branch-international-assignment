import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import messagesRouter from "./routes/messages.js";

dotenv.config();

const app = express();
const httpServer = createServer(app); // Create HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PATCH"],
  },
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Attach Socket.IO to all requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api/messages", messagesRouter);

// Socket.IO events
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start the server
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

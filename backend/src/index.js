import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import database from './db/database.js';
import touristRouter from './routes/touristRoute.js';
import touristProfileRouter from './routes/touristProfileRoute.js';
import tripRoutes from './routes/tripRoute.js';
import reviewRouter from './routes/reviewRoute.js';
import guideRouter from './routes/guideRoute.js';
import profileRouter from './routes/profileRoute.js';
import kycRoutes from './routes/kycRoute.js';
import chatRoutes from './routes/chatRoute.js';
import notificationRouter from './routes/notificationRoute.js'; // Import the notification router

import Notification from './models/notificationModel.js';
import Chat from './models/chatModel.js';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// Using the CORS middleware
app.use(cors({
  origin: ["http://localhost:5173"], // Ensure this matches your frontend origin
  credentials: true, // Allow credentials (cookies) to be sent
}));

// Using the routes
app.use('/api/v1/tourist', touristRouter);
app.use('/api/v1/tourist-profiles', touristProfileRouter);
app.use("/api/v1/kyc", kycRoutes);
app.use("/api/v1/trip", tripRoutes);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/chats', chatRoutes);
app.use('/api/v1/users', guideRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/notifications', notificationRouter); // Add the notification route

// Connect to database
database();

// Static file serving
app.use('/uploads', express.static('public/uploads'));

// Start the server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// WebSocket integration
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Notification handling
  const { touristId } = socket.handshake.query;

  if (touristId) {
    socket.join(`tourist_${touristId}`);
    console.log(`User with touristId ${touristId} connected and joined room tourist_${touristId}`);
  }

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("sendNotification", async (data) => {
    const { touristId, message } = data;
    console.log(` ${touristId}: ${message}`);

    // Save notification to database
    const notification = new Notification({ touristId, message });
    await notification.save();

    io.to(`tourist_${touristId}`).emit('notification', {
      touristId,
      message,
    });
  });

  // Chat handling
  socket.on('joinRoom', ({ guideId, touristId }) => {
    socket.join(`${guideId}-${touristId}`);
  });

  socket.on('chatMessage', ({ guideId, touristId, message, sender }) => {
    const chatMessage = new Chat({ guideId, touristId, message, sender });
    chatMessage.save().then(() => {
      io.to(`${guideId}-${touristId}`).emit('message', chatMessage);
    });
  });

  socket.on('sendToFrontend', (data) => {
    console.log(`Sending info to all sockets: ${data}`);
    io.emit("frontendInfo", data); // Emit to all sockets including sender
  });
});

// Start the server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app };
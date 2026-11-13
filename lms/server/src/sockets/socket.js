
import { Server } from "socket.io";

import { socketAuthMiddleware } from "./socketAuth.middleware.js";
import { registerChatHandlers } from "./chat.socket.js";

let io;

const allowedOrigins = [
  "http://localhost:5173",
  "https://learnhubcloud.in",
];
export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Socket authentication
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log(
      `Socket connected: ${socket.user.name} (${socket.user.role})`
    );

    // Register live chat events
    registerChatHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log(
        `Socket disconnected: ${socket.user.name}`
      );
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO is not initialized");
  }

  return io;
};

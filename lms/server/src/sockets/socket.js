import { Server } from "socket.io";
import { socketAuthMiddleware } from "./socketAuth.middleware.js";

let io;

export const initializeSocket = (httpServer) => {
  const allowedOrigins = [
  "http://localhost:5173",
  "https://learnhubcloud.in",
];

      io = new Server(httpServer, {
                cors: {
                origin: allowedOrigins,
                methods: ["GET", "POST"],
                credentials: true,
              },
      });

  // Authenticate every socket connection
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log(
      `Socket connected: ${socket.user.name} (${socket.user.role})`
    );

    socket.on("disconnect", () => {
      console.log(
        `Socket disconnected: ${socket.user.name}`
      );
    });
  });

  return io;
};

// Access Socket.IO instance anywhere in backend
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO is not initialized");
  }

  return io;
};

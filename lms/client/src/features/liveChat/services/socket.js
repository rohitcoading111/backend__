
import { io } from "socket.io-client";

let socket = null;

// Connect to backend Socket.IO server
export const connectLiveChat = (token) => {
  if (!token) {
    throw new Error("Authentication token is required");
  }

  // Reuse existing connection
  if (socket?.connected) {
    return socket;
  }

  // Disconnect old connection if token/session changes
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: {
      token,
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: true,
  });

  socket.on("connect", () => {
    console.log("Live chat connected:", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.error("Live chat connection error:", error.message);
  });

  socket.on("disconnect", (reason) => {
    console.log("Live chat disconnected:", reason);
  });

  return socket;
};

// Get existing socket instance
export const getLiveChatSocket = () => {
  return socket;
};

// Disconnect socket
export const disconnectLiveChat = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

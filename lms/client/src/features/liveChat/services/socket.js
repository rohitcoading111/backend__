
import { io } from "socket.io-client";
import api from "../../../services/api";

let socket = null;

const getSocketUrl = () => {
  const apiBaseURL = api.defaults.baseURL;

  if (!apiBaseURL) {
    throw new Error("API base URL is not configured");
  }

  return new URL(apiBaseURL, window.location.origin).origin;
};

export const connectLiveChat = (token) => {
  if (!token) {
    throw new Error("Authentication token is required");
  }

  if (socket?.connected) {
    return socket;
  }

  if (socket) {
    socket.disconnect();
    socket = null;
  }

  const socketUrl = getSocketUrl();

  socket = io(socketUrl, {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
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

export const getLiveChatSocket = () => socket;

export const disconnectLiveChat = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

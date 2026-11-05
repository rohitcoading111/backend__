import { createServer } from "node:http";
import { Server } from "socket.io";

import app from "./app/app.js";
import db from "./config/db.js";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});



io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // Client ko room mein add karna
  socket.on("room:join", (roomName) => {
    socket.join(roomName);

    console.log(`${socket.id} joined ${roomName}`);

    // Client ko confirmation bhejna
    socket.emit("room:joined", roomName);
  });

  // Room ke sabhi connected members ko message bhejna
  socket.on("room:test", ({ roomName, message }) => {
    io.to(roomName).emit("room:message", message);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});



const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db();

    httpServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exitCode = 1;
  }
};

startServer();

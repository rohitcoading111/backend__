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

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

db();

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});

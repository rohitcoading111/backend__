import { initializeSocket } from "./sockets/socket.js";
import { createServer } from "node:http";

import app from "./app/app.js";
import db from "./config/db.js";


const httpServer = createServer(app);

// Initialize Socket.IO
initializeSocket(httpServer);

// Database connection
db();

// Start server
const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

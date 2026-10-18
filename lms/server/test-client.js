
import { io } from "socket.io-client";

const studentA = io("http://localhost:3000");
const studentB = io("http://localhost:3000");

function setupStudent(socket, name, roomName) {
  socket.on("connect", () => {
    console.log(`${name} connected`);

    socket.emit("room:join", roomName);
  });

  socket.on("room:joined", (room) => {
    console.log(`${name} joined ${room}`);

    // Sirf Student A message bhejega
    if (name === "Student A") {
      socket.emit("room:test", {
        roomName: "course-101",
        message: "Live session has ended!",
      });
    }
  });

  socket.on("room:message", (message) => {
    console.log(`${name} received:`, message);
  });
}

setupStudent(studentA, "Student A", "course-101");
setupStudent(studentB, "Student B", "course-202");

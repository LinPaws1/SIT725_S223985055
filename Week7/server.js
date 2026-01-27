const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

let online = 0;

io.on("connection", (socket) => {
  online++;
  io.emit("users", online);
  console.log("A user connected");

  const timer = setInterval(() => {
    socket.emit("time", new Date().toLocaleTimeString());
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(timer);
    online = Math.max(0, online - 1);
    io.emit("users", online);
    console.log("User disconnected");
  });
});

http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

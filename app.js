if (process.env.NODE_ENV !== "production") require("dotenv").config();
const cors = require("cors");
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   res.json("Hello World!");
// });
io.on("connection", (socket) => {
  console.log(`user ${socket.id} is connected`);

  socket.on("join-room", (id) => {
    console.log(id, "++_+_+_+_++_");
    socket.join(id);
    socket.emit("success-join", id);
  });

  socket.on("location", ({ id, data }) => {
    console.log(id);
    socket.to(id).emit("locationDriver", data);
  });
});

app.use("/", router);
app.use(errorHandler);

module.exports = { server, io };

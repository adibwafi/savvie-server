require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes/index");

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello World!");
});
io.on("connection", (socket) => {
  // console.log(socket)

  console.log(`user ${socket.id} is connected`);

  socket.on("location", (data) => {
    console.log(data, "<< di dalem socket on");
    socket.broadcast.emit("location:received:raven", data);
  });
  socket.on("ping", (count) => {
    console.log(count, "count=+++++");
    socket.broadcast.emit("count:received", count);
  });
  socket.on("disconnect", () => {
    console.log(`user ${socket.id} left`);
  });
});

app.use(routes);

server.listen(PORT, () => {
  console.log("MASIH DI LOCAL", PORT, "BRO!");
});

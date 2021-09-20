const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();
const fs = require("fs");
const errorHandler = require("./middleware/error-handler");
const errorMessage = require("./middleware/error-message");
const accessControls = require("./middleware/access-controls");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(cors());
// to support JSON-encoded bodies
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", function (req, res) {
  res.status(200).send({
    message: "Express backend server",
  });
});
// Requiring Routes
const UsersRoutes = require("./routes/users.routes");
const BooksRoutes = require("./routes/books.routes");

// Routes which should handle requests
app.use("/users", UsersRoutes);
app.use("/books", BooksRoutes);
app.use(errorHandler);
app.use(accessControls);
app.use(errorMessage);
// in case you want to serve images

// connection to mongoose
const mongoCon = process.env.mongoCon;
mongoose.connect(mongoCon, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

fs.readdirSync(__dirname + "/models").forEach(function (file) {
  require(__dirname + "/models/" + file);
});

// SOCKETS--------------//
// const io = require("socket.io")(server);
// let users = [];

// io.on("connection",async (socket) => {
//   socket.on("new-connection", () => {
//     users.push(socket.id);
//     io.emit("users-changed", { user: socket.id, event: "joined" });
//     console.log("con", users);
//   });
//   socket.on("disconnect", function () {
//     const index = users.indexOf(socket.id);
//     if (index > -1) {
//       users.splice(index, 1);
//     }
//     console.log("dis", users);
//     io.emit("users-changed",{ user: socket.id, event: "left" });
 
//   });
//      socket.on("private-message", (first) => {
//       console.log(first);
//       io.to(first.firstuser).emit('message', first.msg);
//     });
// });

//-----------------------------------------//


app.set("port", process.env.PORT);
server.listen(app.get("port"));
console.log("listening on port", app.get("port"));

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { Server } = require("socket.io");

const { authRoutes, orderRoutes } = require("./routes");
const { AppError, globalErrorHandler } = require("./errors");

const app = express();
const port = 4000;

require("dotenv").config();

// DATABASE SETUP
// connect to db
mongoose.connect(process.env.MONGODATABASE);
// display message on connect
mongoose.connection.on("connected", () => {
  console.log("Connected to databse: ", process.env.MONGODATABASE);
});
// display message on error
mongoose.connection.on("error", (err) => {
  console.log("Database error: ", err);
});

// logger
app.use(morgan("dev"));

// bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
// This allows client applications from other domains use the API Server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "Authorization, refresh");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, refresh"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  next();
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("A user connected.");
  socket.emit("event://socket-id", { success: true, socketId: socket.id });
  socket.emit("event://socket-message", { message: "Connected to socket." });
});

// use routes
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

// test routes
app.get("/", (req, res) => {
  console.log("Hi!");
  res.send("Hi!");
});

app.get("/test", (req, res) => {
  console.log("Test endpoint hit!");
  res.json({ success: true });
});

// Errors
// --- unknown routes
app.all("*", (req, res, next) =>
  next(new AppError(`Could not find ${req.originalUrl} on this server!`, 404))
);

// --- global errors
app.use(globalErrorHandler);

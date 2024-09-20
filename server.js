const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectToDB = require("./configs/db");
const userRouter = require("./routes/userRoutes");
const { authenticateSocket } = require("./middleware/socketAuth");
const { chatHandler } = require("./socket/chatHandler");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (like cookies or tokens)
  },
});

const port = process.env.PORT;
const db_url = process.env.MONGODB_URL;

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", userRouter);

io.use(authenticateSocket);
io.on("connection", (socket) => {
  chatHandler(socket, io);
});

//DB connection and server
server.listen(port, async () => {
  try {
    await connectToDB(db_url);
    console.log("We are successfully connected to the database");
    console.log(`Server is running at http://localhost:${port}`);
  } catch (err) {
    console.log(err);
  }
});

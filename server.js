// backend/server.js
require("dotenv").config(); // load .env (make sure dotenv is installed)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
// Make sure your tasks route file name is correct: use "./routes/tasks"
const taskRoutes = require("./routes/task");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// connect to MongoDB
const MONGO_URI = "mongodb+srv://sankarathi49_db_user:dX31s2dbXitgEAof@cluster0.fxk5mc4.mongodb.net/";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

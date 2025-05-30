const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors"); // <-- ADD THIS
require("dotenv").config();

app.use(cors()); // <-- ADD THIS
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running")))
  .catch((err) => console.log(err));

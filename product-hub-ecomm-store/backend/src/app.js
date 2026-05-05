require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookies());

// Logging middleware
app.use((req, res, next) => {
  next();
});

app.use("/api", authRoutes);
app.use("/api", orderRoutes);

module.exports = app;

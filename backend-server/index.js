// GET ENVIROMENT VARS
require("dotenv/config");

// DB CONNECTION
const { mongoose } = require("./db-connection.js");

// EXPRESS
const express = require("express");

const bodyParser = require("body-parser");

// IMPORTS ROUTES
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

// EXPRESS APP
const app = express();

// MIDDLEWARE
const cors = require("cors");
app.use(cors({ origin: process?.env?.BACKEND_HOST }));
app.use(bodyParser.json());
app.use("/api/user", authRoutes);
app.use("/api/blog", blogRoutes);

// ROUTES
app.get("/", (req, res) => {
  res.json({ message: "we are on home page" });
});

// SERVER LISTEN ON PORT
const port = process?.env?.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at port : ${port}`);
});

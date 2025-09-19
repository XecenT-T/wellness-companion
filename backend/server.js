const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const connectDB = require('./config/mongodb');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const meowRoutes = require("./routes/meowroutes");
// Middleware
app.use(express.json());

// Routes

app.use("/", routes);
app.use("/meow", meowRoutes);



  const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

startServer();
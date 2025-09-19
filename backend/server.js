const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
const userRoutes = require("./routes/userroutes");

app.use("/", routes);
app.use("/user", userRoutes);



  app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); 
  });
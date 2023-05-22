const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const API = process.env.Api_URL;
const PORT = process.env.PORT || 5658;

// model


// middleware
app.use(cors());
app.use(express.json());

// Routers
app.use(`${API}/bot`, messageRoutes);
app.use(`${API}/user`, userRoutes);

//Databse connection

mongoose
  .connect(
    "mongodb+srv://ManojKumar:ManojKumar@cluster0.jir7wgl.mongodb.net/demo?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connection is ready .....");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

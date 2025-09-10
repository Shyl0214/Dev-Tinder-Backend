const express = require("express");
const { authAdmin, userAuth } = require("./middleware/auth");
const { connectDB } = require("./config/database");

const app = express();

connectDB()
  .then(() => {
    console.log("DB Successfully Connected");
    app.listen(3000, () => {
      console.log("Server running successfully");
    });
  })
  .catch(() => {
    console.log("DB Connection Failed");
  });

const express = require("express");
const app = express();

const { adminAuth } = require("./middlewares/auth");

app.get("/user", (req, res) => {
  res.send("user data sent");
});

app.get("/admin/getAllData", adminAuth, (req, res) => {
  res.send("All Data Sent");
});

app.get("/admin/deleteData", adminAuth, (req, res) => {
  res.send("Deleted Data Successfully");
});

app.listen(7777, () => {
  console.log("Port is running successfully");
});

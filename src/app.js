const express = require("express");
const app = express();
const port = 7777;

app.get("/", (req, res) => {
  res.send("homepage");
});

app.get("/login", (req, res) => {
  res.send("login");
});

app.get("/signup", (req, res) => {
  res.send("signup");
});

app.listen(port, () => {
  console.log("Port is running successfully");
});

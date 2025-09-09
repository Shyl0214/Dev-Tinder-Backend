const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("hello from root url");
});

app.use("/test", (req, res) => {
  res.send("hello from test");
});

app.listen(3000, () => {
  console.log("Server running successfully");
});

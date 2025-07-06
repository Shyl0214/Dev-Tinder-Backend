const express = require("express");
const app = express();
const port = 7777;

// routes
app.use(
  "/user",
  (req, res, next) => {
    console.log("log 1");
    next();
  },
  (req, res, next) => {
    console.log("log 2");
    next();
  },
  (req, res, next) => {
    console.log("log 3");
    next();
  },

  (req, res, next) => {
    console.log("log 4");
    res.send("Hello 4 ");
  }
);

app.listen(port, () => {
  console.log("Port is running successfully");
});

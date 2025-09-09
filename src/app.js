const express = require("express");

const app = express();

app.use("/user", (req, res) => {
  res.send("hello hello hello");
});

app.get("/user", (req, res) => {
  res.send("hello from the user");
});

app.post("/user", (req, res) => {
  res.send("data added successfully");
});

app.patch("/user", (req, res) => {
  res.send("user updated successfully");
});

app.delete("/user", (req, res) => {
  res.send("user deleted successfully");
});



app.listen(3000, () => {
  console.log("Server running successfully");
});

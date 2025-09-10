const express = require("express");
const { authAdmin, userAuth } = require("./middleware/auth");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Smith",
    lastName: "roy",
    email: "smith12@gmail.com",
    password: "sm123",
  });

  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error adding user");
  }
});

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

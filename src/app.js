const express = require("express");
const { connectDB } = require("./config/database");
const { userModel } = require("./models/user");
const app = express();

// post api call to add data in the database
app.post("/signup", async (req, res) => {
  
  // creating a new instance of the userModel
  const user = new userModel({
    firstName: "Shailesh",
    lastName: "Singh",
    email: "shaileshkumarsingh988@gmail.com",
    password: "shailesh@123",
  });

  user.save();
  res.send("user data added successfully");
});

connectDB()
  .then(() => {
    console.log("DB Successfully connected");
    app.listen(7777, () => {
      console.log("Server is running successfully on port 7777");
    });
  })
  .catch((err) => {
    console.error("DB was not connected");
  });

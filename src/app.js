const express = require("express");
const { connectDB } = require("./config/database");
const { userModel } = require("./models/user");
const app = express();

// this is a middleware which can convert the json obj to js object
app.use(express.json());

// post api call to add data in the database
app.post("/signup", async (req, res) => {
  
  console.log(req.body);
  // creating a new instance of the userModel
  const user = new userModel(req.body);

  try {
    await user.save();
    res.status(201).send("User added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

//Note : First connect Db and then start the server
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

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

// api to find user by email in collection
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const findUser = await userModel.findOne({ email: userEmail });
    if (!findUser) {
      res.status(404).send("user not found");
    } else {
      res.send(findUser);
    }
  } catch (err) {
    res.status(404).send("user not found");
  }
});

// api to find all users in collection
app.get("/userAll", async (req, res) => {
  try {
    const findAllUsers = await userModel.find({});
    if (!findAllUsers) {
      res.status(404).send("Data not found");
    } else {
      res.send(findAllUsers);
    }
  } catch (err) {
    res.status(404).send("user not found");
  }
});

// api to find the user by its ID
app.get("/findById", async (req, res) => {
  const userID = req.body._id;
  console.log(userID);

  try {
    const getUser = await userModel.find({ _id: userID });
    if (!getUser) {
      res.status(404).send("User not found");
    } else {
      res.send(getUser);
    }
  } catch (err) {
    res.status(404).send("user not found");
  }
});

// api to delete user using his id
app.delete("/userDelete", async (req, res) => {
  const userID = req.body._id;
  console.log(userID);
  try {
    const userDelete = await userModel.findByIdAndDelete({ _id: userID });
    if (!userDelete) {
      res.send("user not found");
    } else {
      res.send("User deleted successfully")
    }
  } catch (err) {
    res.status(404).send("user not found");
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

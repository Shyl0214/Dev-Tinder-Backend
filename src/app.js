const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

// find user by id
app.get("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findById({ _id: userId });
    res.json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// find all users
app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (err) {
    res.status(400).send("Error fetching users");
  }
});

// add user
app.post("/signup", (req, res) => {
  const body = req.body;
  try {
    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "age",
      "gender",
      "bio",
      "profilePic",
      "skills",
    ];

    for (const key of Object.keys(body)) {
      if (!allowedFields.includes(key)) {
        throw new Error(`Field ${key} is not allowed`);
      }
    }

    const newUser = new User(body);
    newUser.save();
    res.send("User added successfully");
  } catch (err) {
    res.send(err.message);
  }
});

// delete user
app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(400).send("Error deleting user");
  }
});

//update user
app.patch("/user", async (req, res) => {
  const userId = req.body._id;
  const body = req.body;
  try {
    const allowedFields = [
      "firstName",
      "lastName",
      "password",
      "age",
      "gender",
      "bio",
      "profilePic",
      "skills",
    ];

  
    for (const key of Object.keys(body)) {
      if (!allowedFields.includes(key) && key !== "_id") {
        throw new Error(`Field ${key} is not allowed`);
      }
    }

    const user = await User.findByIdAndUpdate(userId, body, { new: true });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (err) {
    res.status(400).send(err.message);
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
    console.log("Server connection failed");
  });

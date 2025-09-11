const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");

const app = express();

app.use(express.json());

// find user by id
app.get("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findById({ _id: userId });
    res.send(user);
  } catch (err) {
    res.status(400).send("Error fetching user");
  }
});

// find user by email
// app.get("/user", async (req, res) => {
//   const userMail = req.body.email;
//   try {
//     const user = await User.find({ email: userMail });
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("Error fetching user");
//   }
// });

// find all user
app.get("/feed", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send(allUser);
  } catch (err) {
    res.status(400).send("Error fetching user");
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error adding user");
  }
});

// delete user by id
app.delete("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send(user);
  } catch (err) {
    res.status(400).send("Something was wrong");
  }
});

// update user by id
app.patch("/user", async (req, res) => {
  const userId = req.body._id;
  const body = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, body);
    res.send(user);
  } catch (err) {
    res.status(400).send("Something was wrong");
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

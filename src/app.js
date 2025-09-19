const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateUserSingUp } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

// find user by id
app.get("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(400).send("Error fetching user");
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
app.post("/signup", async (req, res) => {
  try {
    // validate user
    validateUserSingUp(req);

    //hash the password
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    // create instance of the user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    // save the user
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      } else {
        res.send("Login successful");
      }
    }
  } catch (err) {
    res.status(400).send("Error" + err.message);
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

  try {
    for (const key of Object.keys(body)) {
      if (!allowedFields.includes(key) && key !== "_id") {
        throw new Error(`Field ${key} is not allowed`);
      }
    }

    if (body.skills.length > 5) {
      throw new Error("Cannot add more than 5 skills");
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

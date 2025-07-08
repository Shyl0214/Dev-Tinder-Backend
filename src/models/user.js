const mongoose = require("mongoose");

// creating a userSchema after mongoose
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = {
  userModel,
};

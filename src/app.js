const express = require("express");
const { authAdmin, userAuth } = require("./middleware/auth");

const app = express();

//middle-ware
app.use("/admin", authAdmin);

// admin routes
app.get("/admin/allUserData", (req, res) => {
  res.send("Data sent to admin");
});

app.delete("/admin/delUserData", (req, res) => {
  res.send("Deleted user data");
});

// user routes
app.get("/user/getProfileData", userAuth, (req, res) => {
  res.send("Profile data sent");
});

app.delete("/user/delProfileData", userAuth, (req, res) => {
  res.send("Profile data deleted");
});

app.post("/user/login", (req, res) => {
  res.send("user logged in");
});

app.listen(3000, () => {
  console.log("Server running successfully");
});

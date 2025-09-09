const express = require("express");
const { authAdmin } = require("./middleware/auth");

const app = express();

//middle-ware
app.use("/admin", authAdmin);

app.get("/admin/allUserData", (req, res) => {
  res.send("Data sent to admin");
});

app.delete("/admin/delUserData", (req, res) => {
  res.send("Deleted user data");
});

app.listen(3000, () => {
  console.log("Server running successfully");
});

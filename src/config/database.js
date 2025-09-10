const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://shaileshkumarsingh988:shailesh@namastenode.j3xhbvc.mongodb.net/devTinder"
  );
}

module.exports = {
  connectDB,
};

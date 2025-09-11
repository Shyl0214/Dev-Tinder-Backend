const mongoose = require("mongoose");

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(
      "mongodb+srv://shaileshkumarsingh988:93xJrkRlICGFw20B@namastenode.j3xhbvc.mongodb.net/devTinder"
    );
  }
}

module.exports = {
  connectDB,
};

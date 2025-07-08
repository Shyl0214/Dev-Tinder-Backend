const { mongoose } = require("mongoose");

// this will return a promise
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shaileshkumarsingh988:BmPkEM96VXHGrDr8@namastenode.j3xhbvc.mongodb.net/devTinder"
  );
};

module.exports = {
  connectDB,
};

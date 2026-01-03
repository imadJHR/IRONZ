const mongoose = require("mongoose");

async function connectDB(MONGO_URI) {
  if (!MONGO_URI) throw new Error("MONGO_URI is missing");
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");
}

module.exports = connectDB;
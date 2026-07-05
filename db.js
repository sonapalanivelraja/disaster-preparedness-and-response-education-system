const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/disasterDB");
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.log("❌ Database Connection Failed");
    console.error(error);
  }
}

module.exports = connectDB;
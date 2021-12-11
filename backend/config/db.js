const mongoose = require("mongoose");
const DB_URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/userAuths";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URL, {
      useUnifiedtopology: true,
    });
    console.log(`Connected successfully ${conn.connection.host}`);
  } catch (error) {
    console.error(`ERROR : ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;

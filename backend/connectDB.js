const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database connected ${conn.connection.host}`);
  } catch (err) {
    console.log("there are error in db", err);
    process.exit(1);
  }
};

module.exports = connectDB;

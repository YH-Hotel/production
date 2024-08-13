const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://teamerror406:${process.env.MONGO_PASSWORD}@cluster0.qeokcbu.mongodb.net/mainDB`,
      {
        useNewUrlParser: true,
      }
    );
    console.log(`Database Connected Successfully`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
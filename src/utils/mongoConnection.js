require("dotenv").config();
const { default: mongoose } = require("mongoose");

async function connectMongoDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected Sucessfully");
}

module.exports = connectMongoDB;

const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/jumbo-notes';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process on failure
  }
};

module.exports = connectToMongo;

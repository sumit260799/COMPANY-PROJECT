const mongoose = require("mongoose");

// Replace 'your_database_url' with your actual MongoDB connection URL
const URL = process.env.MONGO_URL;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

module.exports = mongoose; // Export the Mongoose instance

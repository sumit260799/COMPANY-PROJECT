const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid library

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Check if the URL starts with "https://"
        return /^https:\/\//.test(v);
      },
      message: "URL must start with 'https://'",
    },
  },
  title: {
    type: String,
    required: true,
  },
  commonId: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness of uniqueId
    default: uuidv4, // Use uuidv4 function to generate a unique ID
  },
});

const Link = mongoose.model("inf_Link", linkSchema);

module.exports = Link;

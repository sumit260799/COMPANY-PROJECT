const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  commonId: {
    type: String,
  },
  customerId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String, // You can store the URL to the profile picture
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

const UserRegister = mongoose.model("UserRegister", userSchema);

module.exports = UserRegister;

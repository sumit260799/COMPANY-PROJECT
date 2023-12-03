const mongoose = require("mongoose");

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  commonId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    default: "admin@gmail.com",
  },
  password: {
    type: String,
    required: true,
    default: "admin@123",
  },
  role: {
    type: String,
    default: "adminUser",
  },
});

// Create the Admin model
const AdminRegister = mongoose.model("AdminRegister", adminSchema);

module.exports = AdminRegister;

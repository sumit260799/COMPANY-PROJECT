const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    commonId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "brandUser",
    },
  },
  { timestamps: true }
);

const BrandsRegister = mongoose.model("BrandsRegister", brandSchema);

module.exports = BrandsRegister;

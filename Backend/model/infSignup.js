const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    commonId: {
      type: String,
    },
    shopName: {
      type: String,
      required: true,
      unique: true,
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
    agreedToTerms: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      default: "infUser",
    },
  },
  { timestamps: true }
);

const MarketPlaceRegister = mongoose.model("inf_SignUp", shopSchema);

module.exports = MarketPlaceRegister;

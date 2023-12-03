const mongoose = require("mongoose");

const brandsConnectionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Invalid email address format",
    },
  },
  phoneNo: {
    type: Number,
    required: true,
    unique: true,
  },
  commonId: {
    type: String,
  },
});

const BrandsConnection = mongoose.model(
  "BrandsConnection",
  brandsConnectionSchema
);

module.exports = BrandsConnection;

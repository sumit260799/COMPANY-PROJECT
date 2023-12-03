const mongoose = require("mongoose");

const brandInfoSchema = new mongoose.Schema(
  {
    commonId: {
      type: String,
    },
    companyName: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    brandDesc: {
      type: String,
    },
    brandImage: {
      type: String,
      required: false,
      default: "",
    },
    organisationNumber: {
      type: String,
      unique: true,
    },
    vatNumber: {
      type: String,
      unique: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: String, // Optional
    postalCode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },

    // You can add more fields as needed
  },
  { timestamps: true }
);

const BrandInfo = mongoose.model("BrandInfo", brandInfoSchema);

module.exports = BrandInfo;

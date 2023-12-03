const mongoose = require("mongoose");
const uuid = require("uuid");

const productSchema = new mongoose.Schema({
  commonId: {
    type: String,
  },
  productId: {
    type: String,
    default: function () {
      return uuid.v4();
    },
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productDesc: {
    type: String,
  },
  productCategory: {
    type: String,
  },
  productDiscount: {
    type: Number,
    default: 0,
  },
  productImages: [{ type: String }],
  brandName: {
    type: String,
  },
  brandDesc: {
    type: String,
  },
  companyName: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const BrandProductInfo = mongoose.model("BrandProductInfo", productSchema);

module.exports = BrandProductInfo;

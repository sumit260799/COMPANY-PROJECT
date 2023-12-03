const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  commonId: {
    type: String,
  },
  companyName: {
    type: String,
  },
  brandName: {
    type: String,
  },
  brandDesc: {
    type: String,
  },
  productId: {
    type: String,
  },
  productName: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  productDesc: {
    type: String,
  },
  productDiscount: {
    type: Number,
    default: 0,
  },
  productCategory: {
    type: String,
  },
  stock: {
    type: Number,
  },
  exists: {
    type: Boolean,
    default: false,
  },
  productImages: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: String,
  },
});

const ProductDashboard = mongoose.model("inf_ProductDashboard", productSchema);

module.exports = ProductDashboard;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  commonId: {
    type: String,
  },
  customerId: {
    type: String,
  },
  productId: {
    type: String,
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
});

const UsersWishlist = mongoose.model("UsersWishlist", productSchema);

module.exports = UsersWishlist;

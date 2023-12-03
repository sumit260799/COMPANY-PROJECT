const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  productPrice: Number,
  productImages: [{ type: String }],
  productDiscount: Number,
  productCategory: String,
  stock: Number,
  brandName: String,
  brandDesc: String,
  commonId: String,
  companyName: String,
  createdAt: String,
});

const collectionSchema = new mongoose.Schema({
  commonId: {
    type: String,
  },
  collectionId: {
    type: String,
  },
  collectionName: {
    type: String,
    required: true,
  },
  collectionImage: {
    type: String, // Assuming you store the image path or URL
  },
  items: [itemSchema],
});

const UsersCollection = mongoose.model("UsersCollection", collectionSchema);

module.exports = UsersCollection;

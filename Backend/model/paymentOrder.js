const express = require("express");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  customerId: String,
  influencerId: String,
  amount: Number,
  currency: String,
  receipt: String,
  shippingAddress: {
    name: String,
    phone: String,
    zip: String,
    address1: String,
    address2: String,
    city: String,
  },
  status: String,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

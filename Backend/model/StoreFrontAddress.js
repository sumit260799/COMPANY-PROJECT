const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  address: {
    type: String,
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
  landmark: {
    type: String,
  },
  alterPhone: {
    type: String,
  },
});

const StoreFrontAddress = mongoose.model("StoreFrontAddress", AddressSchema);

module.exports = StoreFrontAddress;

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  profileId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  address1: {
    type: String,
    trim: true,
  },
  address2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  zip: {
    type: Number,
    trim: true,
  },
});

const ProfileSettings = mongoose.model("inf_Setting", profileSchema);

module.exports = ProfileSettings;

const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  commonId: {
    type: String,
  },
  websiteURL: {
    type: String,
  },
  productCategory: {
    type: String,
    required: true,
  },
  eCommercePlatform: {
    type: String,
    required: true,
  },
  wheredidyoulearnabout: {
    type: String,
  },
  supportEmailAddress: {
    type: String,
  },
});

const WebsiteInfo = mongoose.model("BrandWebsiteInfo", websiteSchema);

module.exports = WebsiteInfo;

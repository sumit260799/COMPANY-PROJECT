const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    commonId: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "",
    },
    shopTitle: {
      type: String,
      required: true,
    },
    shopDescription: {
      type: String,
    },
    heroImage: {
      type: String,
      default: "",
    },
    brandsPage: {
      type: Boolean,
      default: false,
    },
    blogPage: {
      type: Boolean,
      default: false,
    },
    seoTitle: String,
    seoDescription: String,
    storeBackgroundColor: {
      type: String,
      default: "#fff",
    },
    productTitleColor: {
      type: String,
      default: "#000000",
    },
    buttonColor: {
      type: String,
      default: "#000",
    },
    buttonShape: {
      type: String,
      enum: ["pointy", "smooth", "smoothest"],
      default: "smooth",
    },
    useCards: {
      type: String,
      enum: ["No Cards", "Cards with border", "Cards with shadow"],
      default: "Cards with shadow",
    },
    infUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "inf_SignUp",
    },
  },
  { timestamps: true }
);

const DesignShop = mongoose.model("inf_DesignShop", shopSchema);

module.exports = DesignShop;

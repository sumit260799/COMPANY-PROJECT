const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    commonId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others", "Prefer not to say"],
      required: true,
    },
    fUsername: {
      type: String,
    },
    iUsername: {
      type: String,
    },
    tUsername: {
      type: String,
    },
    yUsername: {
      type: String,
    },
    category: {
      type: [String], // An array of strings

      enum: [
        "Arts & Photography",
        "Beauty",
        "Fashion",
        "Food & Drinks",
        "Health & Fitness",
        "Home & Garden",
        "Gaming & Esports",
        "Mind & Body",
        "Movies, TV & Books",
        "Music",
        "Lifestyle",
        "Outdoors & Nature",
        "Parenting & Family",
        "Pets",
        "Sports",
        "Technology",
        "Travel",
      ],
      // required: true,
    },
  },
  { timestamps: true }
);

const marketPalaceLanding = mongoose.model("inf_Landing", userSchema);

module.exports = marketPalaceLanding;

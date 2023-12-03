const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/userMiddleware");

const {
  getUser,
  postUser,
  registerUser,
  loginUser,
  logoutUser,
  wishlistUser,
  getWishlistUser,
  deleteWishlist,
  createCollection,
  getCollections,
  deleteCollection,
  oneCollection,
} = require("../controller/userController");

//..........
router.route("/").get(protect, getUser).post(postUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/wishlist").post(wishlistUser).delete(deleteWishlist);
router.route("/wishlist/:customerId").get(getWishlistUser);
router.route("/logout").post(logoutUser);
router.route("/createcollection").post(createCollection);
router.route("/collections/:commonId").get(getCollections);
router.route("/collections").delete(deleteCollection);
router.route("/collection/:collectionId").get(oneCollection);

module.exports = router;

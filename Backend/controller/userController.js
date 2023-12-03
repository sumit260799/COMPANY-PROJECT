const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const UserRegister = require("../model/userRegister");
const UsersWishlist = require("../model/StorefrontWishlist");
const UsersCollection = require("../model/usersCollections");
const { generateToken } = require("../utils/generateToken");

const getUser = (req, res) => {
  res.json({ isAuthenticated: true });
};
const postUser = (req, res) => {
  const user = { id: 1, name: "post user" };
  res.json(user);
};
const registerUser = async (req, res) => {
  const { commonId, name, email, password, confirmPassword, profilePicture } =
    req.body;

  try {
    // Check if the user already exists
    const existingUser = await UserRegister.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Ensure that the password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    // Hash the password
    const saltRounds = 10; // You can adjust the number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create a new user
    const customerId = uuid.v4();
    const newUser = new UserRegister({
      commonId,
      customerId,
      name,
      email,
      password: hashedPassword,
      confirmPassword,
      profilePicture,
    });
    // Save the user to the database
    await newUser.save();
    if (newUser) {
      await generateToken(res, newUser._id);
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        customerId: newUser.customerId,
        profilePicture: newUser.profilePicture,
        message: "User registered successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserRegister.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "password not matched" });
    }
    await generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      customerId: user.customerId,
      message: "User LoggedIn Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const logoutUser = async (req, res) => {
  res.cookie("authCookie", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  // res.status(200).json({ message: "Logged out successfully" });
};

const wishlistUser = async (req, res) => {
  try {
    const {
      commonId,
      customerId,
      productId,
      productName,
      productPrice,
      productDesc,
      productCategory,
      productDiscount,
      productImages,
      brandName,
      brandDesc,
      companyName,
      stock,
      createdAt,
    } = req.body;
    console.log("body", req.body);
    const existingProduct = await UsersWishlist.findOne({
      customerId,
      productId,
    });

    if (existingProduct) {
      return res.status(400).json({
        message: "product already exists",
      });
    }
    const newProduct = new UsersWishlist({
      commonId,
      customerId,
      productId,
      productName,
      productPrice,
      productDesc,
      productCategory,
      productDiscount,
      productImages,
      brandName,
      brandDesc,
      companyName,
      stock,
      createdAt,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getWishlistUser = async (req, res) => {
  try {
    const { customerId } = req.params;

    const products = await UsersWishlist.find({ customerId });

    if (!products) {
      return res.status(404).json({ error: "items not found" });
    }
    res.status(200).json(products);
  } catch (error) {}
};
const deleteWishlist = async (req, res) => {
  try {
    const { customerId, productId } = req.body;
    console.log(req.body);
    // Check if the customerId and productId are provided
    if (!customerId || !productId) {
      return res
        .status(400)
        .json({ error: "customerId and productId are required in the params" });
    }

    // Check if the customer exists (you may want to customize this check)
    const customerExists = await UsersWishlist.find({ customerId });
    if (!customerExists) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Check if the product exists (you may want to customize this check)
    const productExists = await UsersWishlist.find({ productId });
    if (!productExists) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product is in the customer's wishlist
    const wishlistItem = await UsersWishlist.findOneAndRemove({
      customerId,
      productId,
    });

    if (!wishlistItem) {
      return res
        .status(404)
        .json({ error: "Product not found in the wishlist" });
    }

    res.status(200).json({
      message: "Product removed from the wishlist successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCollection = async (req, res) => {
  try {
    // Assuming you send the collection data in the request body
    const { commonId, collectionName, collectionImage, items } = req.body;
    // Create a new UsersCollection document
    const collectionId = uuid.v4();
    const newCollection = new UsersCollection({
      commonId,
      collectionId,
      collectionName,
      collectionImage,
      items,
    });
    // Save the new collection to the database
    const savedCollection = await newCollection.save();

    res.status(201).json(savedCollection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCollections = async (req, res) => {
  try {
    const commonId = req.params.commonId;

    // Find the collection in the database based on commonId
    const foundCollection = await UsersCollection.find({ commonId });

    if (!foundCollection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.status(200).json(foundCollection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCollection = async (req, res) => {
  try {
    const { commonId, collectionId } = req.body;

    // Find the collection in the database based on commonId and productId
    const foundCollection = await UsersCollection.findOneAndDelete({
      commonId,
      collectionId,
    });

    if (!foundCollection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const oneCollection = async (req, res) => {
  try {
    const collectionId = req.params.collectionId;
    const foundCollection = await UsersCollection.findOne({ collectionId });
    if (!foundCollection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.status(200).json(foundCollection);
  } catch (error) {
    console.error(error);

    // Handle unexpected errors with a 500 Internal Server Error status
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
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
};

const express = require("express");
const app = express();
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key-here";
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const path = require("path");
const port = process.env.PORT || 5000;
const cors = require("cors");
require("./db/url");
const Razorpay = require("razorpay");
// models..
const MarketPlaceRegister = require("./model/infSignup");
const BrandsRegister = require("./model/brandsRegister");
const AdminRegister = require("./model/adminRegister");
const Order = require("./model/paymentOrder");
// router....
const infRouter = require("./routes/infRoutes");
const brandRouter = require("./routes/brandRoutes");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");

const cloudinaryRouter = require("./routes/cloudinaryRoutes");
// ....
const multer = require("multer");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.URL }));

// razorpay......
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.post("/api/payment", async (req, res) => {
  const { amount, currency, receipt, shippingAddress } = req.body;

  if (!amount || !currency || !shippingAddress) {
    return res.status(400).json({
      error:
        "Invalid request. Amount, currency, and shipping address are required.",
    });
  }

  try {
    const options = {
      amount: amount, // amount in paise
      currency: currency,
      receipt: receipt || "order_receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    // Store order details in the database
    const newOrder = new Order({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      shippingAddress,
      status: "Processing", // You can set the initial status as needed
    });

    await newOrder.save();

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Routes...
app.use("/influencer", infRouter);
app.use("/brands", brandRouter);
app.use("/admin", adminRouter);
app.use("/users", userRouter);
app.use("/api/upload", cloudinaryRouter);
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userOne = await MarketPlaceRegister.findOne({ email });
    const userTwo = await BrandsRegister.findOne({ email });

    const userThree = await AdminRegister.findOne({ email });

    // Check if either user exists
    if (!userOne && !userTwo && !userThree) {
      return res.status(404).send("User not found");
    }

    let user, role;
    // Determine the user and role
    if (userOne) {
      user = userOne;
      role = userOne.role;
      commonId = userOne.commonId;
    } else if (userTwo) {
      user = userTwo;
      role = userTwo.role;
      commonId = userTwo.commonId;
    } else {
      user = userThree;
      role = userThree.role;
      commonId = userThree.commonId;
    }

    // Check if the user has been found in a specific database and provide a token
    const tokenData = {
      _id: user._id,
      email: user.email,
      // Add any other relevant data here
    };

    const token = jwt.sign(tokenData, JWT_SECRET_KEY); // Set an appropriate expiration time

    res.status(200).json({ token, role, commonId }); // Send the token and role in the response
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

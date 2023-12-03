const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key-here"; // Use environment variable
const uuid = require("uuid");

const BrandsRegister = require("../model/brandsRegister");
const BrandInfo = require("../model/brandsInfo");
const WebsiteInfo = require("../model/brandsWebInfo");
const BrandsConnection = require("../model/brandsConnection");
const BrandProductInfo = require("../model/brandsProducts");

router.get("/brands", (req, res) => {
  res.send("hello brands");
});

// POST route for brand registration
router.post("/register", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match.");
    }
    // Check if email is already taken
    const existingBrand = await BrandsRegister.findOne({ email });
    if (existingBrand) {
      return res.status(409).send("Email already exists.");
    }
    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format.");
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique commonId (you can use a library like uuid for this)
    const commonId = uuid.v4();

    const newBrand = new BrandsRegister({
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword, // Hashed confirmPassword for consistency
      commonId: commonId, // Assign the generated commonId
    });
    await newBrand.save();
    // Create a response object with all fields except email, password, and confirmPassword
    const responseData = { ...newBrand._doc };
    delete responseData.password;
    delete responseData.confirmPassword;
    delete responseData.createdAt;
    delete responseData.updatedAt;
    delete responseData.__v;

    const token = jwt.sign(responseData, JWT_SECRET_KEY);

    // Return the _id and commonId in the response
    res.status(201).json({ token, commonId });
  } catch (error) {
    res.status(500).send(error);
  }
});

// post..........
router.post("/brandinfo", async (req, res) => {
  try {
    const {
      commonId,
      companyName,
      brandName,
      brandDesc,
      brandImage,
      organisationNumber,
      vatNumber,
      addressLine1,
      addressLine2,
      postalCode,
      city,
      state,
    } = req.body;

    // Check if companyName, vatNumber, and organisationNumber are unique
    const existingBrand = await BrandInfo.findOne({
      $or: [{ companyName }, { vatNumber }, { organisationNumber }],
    });

    if (existingBrand) {
      const existingFields = [];
      if (existingBrand.companyName === companyName) {
        existingFields.push("Company Name");
      }
      if (existingBrand.vatNumber === vatNumber) {
        existingFields.push("VAT Number");
      }
      if (existingBrand.organisationNumber === organisationNumber) {
        existingFields.push("Organization Number");
      }

      return res
        .status(409)
        .send(` ${existingFields.join(", ")}: already exists`);
    }

    const newBrandInfo = new BrandInfo({
      commonId,
      companyName,
      brandName,
      brandDesc,
      brandImage,
      organisationNumber,
      vatNumber,
      addressLine1,
      addressLine2,
      postalCode,
      city,
      state,
    });

    await newBrandInfo.save();

    res.status(201).send("Brand info saved successfully.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// get.............
router.get("/brandinfo", async (req, res) => {
  try {
    const brandInfoList = await BrandInfo.find();
    res.status(200).json(brandInfoList);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// get by commonId
router.get("/brandinfos/:commonId", async (req, res) => {
  try {
    const commonId = req.params.commonId; // Extract commonId from route parameters

    if (!commonId) {
      return res
        .status(400)
        .json({ message: "commonId is missing in route parameters." });
    }

    // Use the commonId to filter BrandInfo documents
    const brandInfoList = await BrandInfo.find({ commonId });

    res.status(200).json(brandInfoList);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/webinfo", async (req, res) => {
  try {
    const {
      websiteURL,
      commonId, // Include commonId if it's part of the request body
      productCategory,
      eCommercePlatform,
      wheredidyoulearnabout,
      supportEmailAddress,
    } = req.body;

    const newWebsiteInfo = new WebsiteInfo({
      websiteURL,
      commonId, // Include commonId in the newWebsiteInfo object
      productCategory,
      eCommercePlatform,
      wheredidyoulearnabout,
      supportEmailAddress,
    });

    const savedWebsiteInfo = await newWebsiteInfo.save();
    return res.status(201).json(savedWebsiteInfo);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/brandcontact", async (req, res) => {
  try {
    const { fullName, email, phoneNo, commonId } = req.body;

    // Validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address format" });
    }

    const existingEmail = await BrandsConnection.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const existingPhoneNo = await BrandsConnection.findOne({ phoneNo });
    if (existingPhoneNo) {
      return res.status(409).json({ message: "Phone number already exists" });
    }

    // Check for commonId existence and uniqueness
    if (commonId) {
      const existingCommonId = await BrandsConnection.findOne({ commonId });
      if (existingCommonId) {
        return res.status(409).json({ message: "User already exists" });
      }
    }

    const newConnection = new BrandsConnection({
      fullName,
      email,
      phoneNo,
      commonId,
    });

    const savedConnection = await newConnection.save();
    res.status(201).json(savedConnection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// post..
router.post("/brandproducts", async (req, res) => {
  try {
    // Parse the request body to extract product data
    const {
      productName,
      commonId,
      productPrice,
      productDesc,
      productCategory,
      productDiscount,
      productImages,
      brandName,
      stock,
    } = req.body;
    const brandInfo = await BrandInfo.findOne({ commonId });

    if (!brandInfo) {
      // Handle the case where the commonId doesn't match any brand information
      return res.status(404).json({ error: "Brand information not found" });
    }

    // Create a new instance of the BrandProductInfo model
    const newProduct = new BrandProductInfo({
      productName,
      commonId,
      productPrice,
      productDesc,
      productCategory,
      productDiscount,
      productImages,
      brandName: brandInfo.brandName,
      brandDesc: brandInfo.brandDesc,
      companyName: brandInfo.companyName,
      stock,
    });

    // Save the new product to the database
    await newProduct.save();

    // Respond with a 201 status (created) and a JSON object with both brand information and the newly created product
    res.status(201).json({
      message: "Product created successfully",
      brandInfo,
      product: newProduct,
    });
  } catch (error) {
    // Handle any errors that occur during the creation process
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Get all products or products for a specific brand
router.get("/brandproducts/:commonId", async (req, res) => {
  try {
    const commonId = req.params.commonId;

    if (!commonId) {
      return res
        .status(400)
        .json({ message: "commonId parameter is missing." });
    }

    const products = await BrandProductInfo.find({ commonId: commonId });

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "Products not found for the specified commonId." });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE route to delete BrandProductInfo by commonId
router.delete("/brandproducts/:productId", async (req, res) => {
  try {
    const productId = req.params.productId; // Extract commonId from URL params

    if (!productId) {
      return res.status(400).json({ message: "commonId is missing." });
    }

    const deletedProduct = await BrandProductInfo.findOneAndDelete({
      productId,
    });

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "No product found with the provided commonId." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// GET route based on productId

router.get("/brandproduct/:productId", async (req, res) => {
  try {
    const productId = req.params.productId; // Extract productId from URL params

    if (!productId) {
      return res.status(400).json({ message: "productId is missing." });
    }

    const product = await BrandProductInfo.findOne({ productId });

    if (!product) {
      return res
        .status(404)
        .json({ message: "No product found with the provided productId." });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT route based on productId

router.put("/brandproduct/:productId", async (req, res) => {
  try {
    const productId = req.params.productId; // Extract productId from URL params

    if (!productId) {
      return res.status(400).json({ message: "productId is missing." });
    }

    // Retrieve the updated product data from the request body
    const updatedProductData = req.body;

    // Find the product by productId and update it
    const updatedProduct = await BrandProductInfo.findOneAndUpdate(
      { productId },
      { $set: updatedProductData },
      { new: true } // Return the updated product in the response
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "No product found with the provided productId." });
    }

    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/brandproducts", async (req, res) => {
  try {
    // Fetch all products when commonId is not provided
    products = await BrandProductInfo.find({});

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

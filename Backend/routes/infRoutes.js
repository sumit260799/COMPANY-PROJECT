const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key-here"; // Use environment variable
const { body, validationResult } = require("express-validator");
const uuid = require("uuid");
const shortid = require("shortid");

const MarketPlaceRegister = require("../model/infSignup");
const MarketPalaceLanding = require("../model/infLanding");
const DesignShop = require("../model/infDesignShop");
const ProductDashboard = require("../model/infDashboards");
const ProfileSettings = require("../model/infSettings");
const BrandProductInfo = require("../model/brandsProducts");
const StoreFrontAddress = require("../model/StoreFrontAddress");
const Link = require("../model/infLinks");

router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/register", async (req, res) => {
  try {
    const { shopName, email, password, confirmPassword, agreedToTerms } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match.");
    }

    if (!agreedToTerms) {
      return res.status(400).send("You must agree to the terms.");
    }

    // Check if shopName is already taken
    const existingShop = await MarketPlaceRegister.findOne({ shopName });
    if (existingShop) {
      return res.status(409).send("Shop name already exists.");
    }

    // Check if email is already taken
    const existingEmail = await MarketPlaceRegister.findOne({ email });
    if (existingEmail) {
      return res.status(409).send("Email already exists.");
    }

    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const commonId = shortid.generate();

    // Create a new document with all the data
    const newShop = new MarketPlaceRegister({
      shopName,
      email,
      password: hashedPassword, // Store the hashed password
      confirmPassword: hashedPassword,
      agreedToTerms: true,
      commonId: commonId,
      // Ensure agreedToTerms is set to true
    });

    await newShop.save();

    // Create a response object with all fields except email, password, and confirmPassword
    const responseData = { ...newShop._doc };
    delete responseData.password;
    delete responseData.confirmPassword;
    delete responseData.createdAt;
    delete responseData.updatedAt;
    delete responseData.agreedToTerms;
    delete responseData.role;
    delete responseData.commonId;
    delete responseData.__v;

    const token = jwt.sign(responseData, JWT_SECRET_KEY);
    res.status(201).json({ token, commonId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/landing", async (req, res) => {
  try {
    const {
      commonId,
      name,
      gender,
      fUsername,
      iUsername,
      tUsername,
      yUsername,
      category,
    } = req.body;

    // Perform comprehensive validation here if needed
    if (!name || !gender) {
      return res.status(400).json({ error: "Name and gender are required." });
    }

    if (!category || category.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one category is required." });
    }
    const newUser = new MarketPalaceLanding({
      commonId,
      name,
      gender,
      fUsername,
      iUsername,
      tUsername,
      yUsername,
      category,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return the saved user object
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// post
router.post("/design", async (req, res) => {
  try {
    // Extract data from the request body
    const {
      commonId,
      profilePicture,
      logo,
      shopTitle,
      shopDescription,
      heroImage,
      brandsPage,
      blogPage,
      seoTitle,
      seoDescription,
      storeBackgroundColor,
      productTitleColor,
      buttonColor,
      buttonShape,
      useCards,
      infUser,
    } = req.body;
    console.log(infUser);
    // Check if shopTitle and shopDescription are missing
    if (!shopTitle) {
      return res.status(400).json({
        error: "ShopTitle is required",
      });
    }

    // Create a new document
    const newDocument = new DesignShop({
      commonId,
      profilePicture,
      logo,
      shopTitle,
      shopDescription,
      heroImage,
      brandsPage,
      blogPage,
      seoTitle,
      seoDescription,
      storeBackgroundColor,
      productTitleColor,
      buttonColor,
      buttonShape,
      useCards,
      infUser,
    });

    // Save the new document to the database
    const savedDocument = await newDocument.save();

    // Respond with the saved document
    res.status(201).json(savedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/design/:commonId", async (req, res) => {
  try {
    const { commonId } = req.params;

    const designData = await DesignShop.findOne({ commonId });
    const marketPalaceLandingData = await MarketPalaceLanding.findOne({
      commonId,
    });

    if (!designData || !marketPalaceLandingData) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Extract 'name' from marketPalaceLandingData and combine it with the rest of the data from designData
    const totalData = {
      ...designData.toObject(),
      name: marketPalaceLandingData.name,
    };

    res.status(200).json(totalData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// put
router.put("/design/:id", async (req, res) => {
  try {
    const commonId = req.params.id; // Get the ID from the URL params
    const updateData = req.body;

    // Validate the request body and handle errors
    if (!updateData) {
      return res
        .status(400)
        .json({ error: "Bad request. No update data provided." });
    }

    // Find the existing document
    const existingDocument = await DesignShop.findOne({ commonId });

    if (!existingDocument) {
      return res.status(404).json({ error: "DesignShop not found" });
    }

    // Check if the existing data is the same as the updateData
    const isDataModified =
      JSON.stringify(existingDocument) !== JSON.stringify(updateData);

    if (!isDataModified) {
      return res.status(304).json({ error: "Not modified" });
    }

    // Update the document
    const updatedDocument = await DesignShop.findOneAndUpdate(
      { commonId }, // Query object
      updateData,
      { new: true } // This option returns the updated document
    );

    // Respond with the updated document
    res.status(200).json({ message: "shop updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//dashboard post//
router.post("/products", async (req, res) => {
  try {
    const {
      companyName,
      brandName,
      brandDesc,
      commonId,
      productId,
      productName,
      productPrice,
      productDesc,
      productDiscount,
      productCategory,
      stock,
      exists,
      productImages,
      createdAt,
    } = req.body;

    const existingProduct = await ProductDashboard.findOne({
      commonId,
      productId,
    });

    if (existingProduct) {
      return res.status(400).json({
        message: "product already exists",
      });
    }
    const newProduct = new ProductDashboard({
      companyName,
      brandName,
      brandDesc,
      commonId,
      productId,
      productName,
      productPrice,
      productDesc,
      productDiscount,
      productCategory,
      stock,
      exists,
      productImages,
      createdAt,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// dasboard get
// GET route to find a product by commonId

router.get("/products/:commonId", async (req, res) => {
  try {
    const commonId = req.params.commonId;

    // Check if commonId is not provided or empty
    if (!commonId) {
      return res.status(400).json({ message: "CommonId is required" });
    }

    // Find products by commonId
    const products = await ProductDashboard.find({ commonId });

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the commonId" });
    }

    res.status(200).send(products);
  } catch (error) {
    console.error("Error finding products by commonId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET route to find a product by productId

router.get("/productdetails/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find a product by productId using findOne
    const product = await BrandProductInfo.findOne({ productId });

    if (!product) {
      return res
        .status(404)
        .json({ message: "No product found for the specified productId" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Error finding product by productId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// dashboard product delete
router.delete("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await ProductDashboard.findOneAndDelete({
      productId,
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product by productId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// inf profile post....
router.post("/profile/:tokenId", async (req, res) => {
  try {
    const tokenId = req.params.tokenId;
    const { profileId /* other fields */ } = req.body;

    // Check if a profile with the given profileId and tokenId already exists
    let existingProfile = await ProfileSettings.findOne({
      _id: profileId,
      tokenId,
    });

    if (existingProfile) {
      // Update the existing profile with the new data
      Object.assign(existingProfile, req.body); // Update other fields as needed
      await existingProfile.save();

      // Return the updated profile in the response
      res.status(200).json(existingProfile);
    } else {
      // Create a new profile if it doesn't exist
      const newProfile = new ProfileSettings({
        profileId, // Assuming _id is the unique identifier
        tokenId, // Add tokenId to the new profile
        /* other fields */
      });

      // Save the new profile to the database
      await newProfile.save();

      // Return the newly created profile in the response
      res.status(201).json(newProfile);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// inf profile get....
router.get("/profile/:profileId", async (req, res) => {
  try {
    const profileId = req.params.profileId;
    // Find the user profile based on profileId
    const userProfile = await ProfileSettings.find({ profileId });

    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.status(200).send(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const validatePost = [
  body("url").isURL().withMessage("URL must be a valid http(s)://"),
  body("title").trim().notEmpty().withMessage("Title is required"),
];

// inf link post
router.post("/link", validatePost, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { url, title, commonId } = req.body;
    const post = new Link({
      url,
      title,
      commonId,
    });
    await post.save();
    res.status(201).json({ message: "Link created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// inf link get
router.get("/link/:id", async (req, res) => {
  try {
    // Extract the post ID from the query parameter
    const commonId = req.params.id;
    // Use Mongoose to find the post by its ID
    const post = await Link.find({ commonId });
    if (!post) {
      // If the post is not found, respond with a 404 status code
      return res.status(404).json({ error: "Post not found" });
    }
    // If the post is found, respond with the post data
    res.status(200).json({ post });
  } catch (error) {
    // Handle any errors that occur during the retrieval
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// inf link delete
router.delete("/link/:id", async (req, res) => {
  try {
    // Extract the commonId from the params
    const uniqueId = req.params.id;

    // Use Mongoose to find and delete the link by commonId
    const deletedLink = await Link.findOneAndDelete({ uniqueId });

    if (!deletedLink) {
      // If the link is not found, respond with a 404 status code
      return res.status(404).json({ error: "Link not found" });
    }

    // If the link is found and deleted successfully, respond with a success message
    res.status(200).json({ message: "Link deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during the deletion
    console.error("Error deleting link:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// inf link update

// router.put("/link/:id", async (req, res) => {
//   try {
//     const uniqueId = req.params.id;
//     const { url, title } = req.body; // Assuming you want to update both 'url' and 'title'

//     // Use Mongoose to find the link by uniqueId and update its fields
//     const updatedLink = await Link.findOneAndUpdate(
//       { uniqueId },
//       { url, title },
//       { new: true } // To get the updated document as the result
//     );

//     if (!updatedLink) {
//       // If the link is not found, respond with a 404 status code
//       return res.status(404).json({ error: "Link not found" });
//     }

//     // If the link is found and updated successfully, respond with the updated link
//     res.status(200).json({ updatedLink });
//   } catch (error) {
//     // Handle any errors that occur during the update
//     console.error("Error updating link:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// extra code
router.get("/storeaddress", async (req, res) => {
  try {
    const documents = await StoreFrontAddress.find();
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

// POST Route: Create a new document
router.post("/storeaddress", async (req, res) => {
  try {
    const newDocument = new StoreFrontAddress(req.body);
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (err) {
    res.status(400).json({ error: "Invalid request data" });
  }
});
module.exports = router;

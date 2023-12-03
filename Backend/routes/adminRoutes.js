const express = require("express");
const router = express.Router();
const DesignShop = require("../model/infDesignShop");
const uuid = require("uuid");
const AdminRegister = require("../model/adminRegister");
router.post("/admin", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const commonId = uuid.v4();

    const newAdmin = new AdminRegister({
      commonId,
      email,
      password,
      role, // Be sure to validate and set the role correctly
    });
    await newAdmin.save();

    res.status(201).json(newAdmin); // Respond with the created admin data
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/infdetails", async (req, res) => {
  try {
    const findUser = await DesignShop.find({});
    res.status(200).json(findUser);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;

const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// register
router.post("/register", async (req, res) => {
  try {
    // Check for duplicate users
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // Create a new user
    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    // Find the user by email
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }

    // Validate the password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid Password",
      });
    }

    // user verification
    if (!user.isVerified) {
      return res.send({
        success: false,
        message: "User is not verified",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    res.send({
      message: "User logged in successfully",
      token: token,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

// get user information
router.post("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password = " ";
    res.send({
      message: "User fetched successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

// update profile
router.put("/:userId", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = req.body;

    await User.findByIdAndUpdate(userId, updatedUser);

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// admin
router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      message: "User fetched",
      data: users,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

// update users
router.post(
  "/update-user-verified-status",
  authMiddleware,
  async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.body.selectedUser, {
        isVerified: req.body.isVerified,
      });
      res.send({
        data: null,
        message: "User verified",
        success: true,
      });
    } catch (error) {
      res.send({
        data: error,
        message: error.message,
        success: false,
      });
    }
  }
);

module.exports = router;

const router = require("express").Router();
const Transaction = require("../models/transactionModel");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");
const { request } = require("express");
const stripe = require("stripe")(process.env.stripe_key);
const { v4: uuidv4 } = require("uuid");
// money transfer
router.post("/transfer-funds", authMiddleware, async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    // sender's balance
    await User.findByIdAndUpdate(req.body.sender, {
      // mongodb property
      $inc: { balance: -req.body.amount },
    });

    // receiver's balance
    await User.findByIdAndUpdate(req.body.receiver, {
      $inc: { balance: req.body.amount },
    });

    res.send({
      message: "Transaction successful",
      data: newTransaction,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Transaction failed",
      data: error.message,
      success: false,
    });
  }
});

// receiver's account
router.post("/verify-account", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.receiver });
    if (user) {
      res.send({
        message: "Account Verified",
        data: user,
        success: true,
      });
    } else {
      res.send({
        message: "Account not found",
        data: error.message,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: "Account not found",
      data: error.message,
      success: false,
    });
  }
});

router.post("/get-transactions", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
    })
      .sort({ createdAt: -1 })
      .populate("sender")
      .populate("receiver");
    res.send({
      message: "Transaction fetched",
      data: transactions,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Transaction not fetched",
      data: error.message,
      success: false,
    });
  }
});

// deposit module
router.post("/deposit-funds", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    // Update user's balance
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        $inc: { balance: amount },
      },
      { new: true }
    );

    const newTransaction = new Transaction({
      sender: req.body.userId,
      receiver: req.body.userId,
      amount: amount,
      type: "deposit",
      reference: "Deposit",
      status: "success",
    });
    await newTransaction.save();

    res.send({
      message: "Transaction Successful",
      data: {
        transaction: newTransaction,
        user: updatedUser,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Transaction Failed",
      error: error.message,
      success: false,
    });
  }
});

module.exports = router;

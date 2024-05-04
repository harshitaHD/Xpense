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

// deposit
router.post("/deposit-funds", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.paymentIntents.create(
      {
        amount: amount,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        description: `Deposited`,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (charge.status === "succeeded") {
      const newTransaction = new Transaction({
        sender: req.body.userId,
        receiver: req.body.userId,
        amount: amount,
        type: "deposit",
        reference: "stripe deposit",
        status: "success",
      });
      await newTransaction.save();

      // Update user's balance
      await User.findByIdAndUpdate(req.body.userId, {
        $inc: { balance: amount },
      });

      res.send({
        message: "Transaction Successful",
        data: newTransaction,
        success: true,
      });
    } else {
      res.status(400).send({
        message: "Transaction Failed",
        data: charge,
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Transaction Failed",
      data: error.message,
      success: false,
    });
  }
});

module.exports = router;

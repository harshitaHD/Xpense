const router = require("express").Router();
const Request = require("../models/requestModel");
const authMiddleware = require("../middlewares/authMiddleware");
const { request } = require("express");
const User = require("../models/userModel");
const Transactions = require("../models/transactionModel");

// get requests
router.post("/get-all-requests-by-user", authMiddleware, async (req, res) => {
  try {
    const requests = await Request.find({
      $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
    })
      .populate("sender")
      .populate("receiver")
      .sort({ createdAt: -1 });

    res.status(200).send({
      data: requests,
      message: "Fetched Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// send request
router.post("/send-request", authMiddleware, async (req, res) => {
  try {
    const { receiver, amount, description } = req.body;
    const request = new Request({
      sender: req.body.userId,
      receiver,
      amount,
      description,
    });
    await request.save();

    res.send({
      data: request,
      message: "Request sent",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update status
router.post("/update-request-status", authMiddleware, async (req, res) => {
  try {
    if (req.body.status === "accepted") {
      const transaction = new Transactions({
        sender: req.body.receiver._id,
        receiver: req.body.sender._id,
        amount: req.body.amount,
        reference: req.body.description,
        status: "success",
      });
      await transaction.save();
      await User.findByIdAndUpdate(req.body.sender._id, {
        $inc: { balance: req.body.amount },
      });
      await User.findByIdAndUpdate(req.body.receiver._id, {
        $inc: { balance: -req.body.amount },
      });
    }
    await Request.findByIdAndUpdate(req.body._id, {
      status: req.body.status,
    });

    res.send({
      data: null,
      message: "Status Updated",
      success: true,
    });
  } catch (error) {
    res.send({
      data: error,
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;

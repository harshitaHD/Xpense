const router = require("express").Router();
const Request = require("../models/requestModel");
const authMiddleware = require("../middlewares/authMiddleware");

// get requests
router.post(
  "/requests/get-all-requests-by-user",
  authMiddleware,
  async (req, res) => {
    try {
      const requests = await Request.find({
        $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
      })
        .populate("sender")
        .populate("receiver");

      res.send({
        data: requests,
        message: "Fetched Successfully",
        success: true,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

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

module.exports = router;

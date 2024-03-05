const mongoose = require("mongoose");
mongoose.connect(process.env.mongo_url);
const connectionRes = mongoose.connection;
connectionRes.on("error", () => {
  console.log(console, "connection failed: ");
});
connectionRes.on("connected", () => {
  console.log("connected to database");
});
module.exports = connectionRes;

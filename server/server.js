const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());

const dbConfig = require("./config/dbConfig");
const usersRoutes = require("./routes/userRoutes");
const transactionRoute = require("./routes/transactionsRoutes");

app.use("/api/users", usersRoutes);
app.use("/api/transaction", transactionRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

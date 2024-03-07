const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());

const dbConfig = require("./config/dbConfig");
const usersRoutes = require("./routes/userRoutes");

app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

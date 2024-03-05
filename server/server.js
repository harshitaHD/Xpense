const express = require("express");
const app = express();

const PORT = process.env.PORT || 3050;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

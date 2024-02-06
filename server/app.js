if (process.env.NODE_ENV !== `production`) {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routers");
// const errorHandler
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json);

app.use(router);

// app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

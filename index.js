require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const userRouter = require("./routes/v1/user.route.js");

app.use(cors());
app.use(express.json());

function runApp() {
  try {
    app.use("/api/v1/user", userRouter);
  } catch (error) {
    console.log(error);
  }
}

runApp();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;

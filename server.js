const express = require("express");
const sequelize = require("./database");
require("dotenv").config();

//? Inintialize DATABASE
sequelize.sync(async () => {
  console.log("db is synced");
});

const app = express();

app.get("/", (req, res) => {
  res.send("Well done!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});

const express = require("express");
const sequelize = require("./database");
const Ingredients = require("./Models/ingredients");
const ingredientsRoutes = require("./Routes/ingredients");
var bodyParser = require('body-parser')

require("dotenv").config();

//? Inintialize DATABASE
sequelize.sync({ force: true }).then(async () => {
  for (let i = 1; i <= 15; i++) {
    const product = {
      name: `product ${i}`,
      quantity: Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 1000000),
      isComplete: Math.random() > 0.5 ? true : false,
    };
    await Ingredients.create(product);
  }
  console.log("db synced");
});

const app = express();

app.get("/", async (req, res) => {
  res.send({
    1: "/ingredient",
  });
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json());

app.use("/ingredients", ingredientsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});

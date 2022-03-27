const express = require("express");
const sequelize = require("./database");
const Ingredients = require("./Models/ingredients");
const ingredientsRoutes = require("./Routes/ingredients");
var bodyParser = require("body-parser");
const Foods = require("./Models/foods");

require("dotenv").config();

//? Inintialize DATABASE
sequelize.sync().then(async () => {
  for (let i = 1; i <= 15; i++) {
    const ingredient = {
      name: `ingredient ${i}`,
      quantity: Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 1000000),
      isComplete: Math.random() > 0.5 ? true : false,
    };
    await Ingredients.create(ingredient);
    const food = {
      name: `food ${i}`,
      priceByIngredient: Math.floor(Math.random() * 10000),
      priceByRestaurant: Math.floor(Math.random() * 1000000),
      benefit: Math.floor(Math.random() * 50),
    };
    await Foods.create(food);
  }
  console.log("db synced");
});

const app = express();

app.get("/", async (req, res) => {
  res.send({
    1: "/ingredients",
  });
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/ingredients", ingredientsRoutes);
app.use("/foods", ingredientsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});

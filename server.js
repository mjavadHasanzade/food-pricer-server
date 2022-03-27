const express = require("express");
const sequelize = require("./database");
const Ingredients = require("./Models/ingredients");
var bodyParser = require("body-parser");
const Foods = require("./Models/foods");

//?Rotes
const ingredientsRoutes = require("./Routes/ingredients");
const foodsRoutes = require("./Routes/foods");

require("dotenv").config();

//? Inintialize DATABASE
sequelize.sync({ force: true }).then(async () => {
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
    2: "/foods",
  });
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/ingredients", ingredientsRoutes);
app.use("/foods", foodsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});

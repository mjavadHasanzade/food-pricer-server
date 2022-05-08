const express = require("express");
const sequelize = require("./database");
const Ingredients = require("./Models/ingredients");
var bodyParser = require("body-parser");
const Foods = require("./Models/foods");
const Users = require("./Models/users");
const Auth = require("./middlewares/Auth");
const cors = require("cors");

//?Rotes
const ingredientsRoutes = require("./Routes/ingredients");
const foodsRoutes = require("./Routes/foods");
const menusRoutes = require("./Routes/menus");
const userRoutes = require("./Routes/user");
const Menus = require("./Models/menus");

require("dotenv").config();

//? Inintialize DATABASE
sequelize.sync({ force: true }).then(async () => {
  await Users.create({
    name: "mj",
    family: "hsnz",
    role: "admin",
    password: "123456",
    isActive: true,
    email: "hjavad522@gmail.com",
  });

  await Users.create({
    name: "mjavad",
    family: "hsnzde",
    role: "user",
    password: "12345689",
    isActive: true,
    email: "hjavad2522@gmail.com",
  });

  for (let i = 1; i <= 15; i++) {
    const ingredient = {
      name: `ingredient ${i}`,
      quantity: Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 1000000),
      isComplete: Math.random() > 0.5 ? true : false,
      UserId: Math.random() > 0.5 ? 1 : 2,
    };
    await Ingredients.create(ingredient);
    const food = {
      name: `food ${i}`,
      priceByIngredient: Math.floor(Math.random() * 10000),
      priceByRestaurant: Math.floor(Math.random() * 1000000),
      benefit: Math.floor(Math.random() * 50),
      UserId: Math.random() > 0.5 ? 1 : 2,
    };
    await Foods.create(food);
  }
  for (let j = 1; j <= 3; j++) {
    const menu = {
      name: `Menu ${j}`,
      isActive: Math.random() > 0.5 ? true : false,
      UserId: Math.random() > 0.5 ? 1 : 2,
    };
    await Menus.create(menu);
  }
  console.log("db synced");
});

const app = express();

app.get("/", async (req, res) => {
  res.send({
    1: "/ingredients",
    2: "/foods",
    3: "/menues",
  });
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cors());

app.use("/ingredients", Auth, ingredientsRoutes);
app.use("/foods", Auth, foodsRoutes);
app.use("/menus", Auth, menusRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});

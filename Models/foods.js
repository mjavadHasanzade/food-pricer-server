const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Ingredients = require("../Models/ingredients");
const FoodByIngredients = require("./foodByIngredients");

const Foods = sequelize.define(
  "Foods",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    priceByIngredient: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    priceByRestaurant: {
      type: DataTypes.REAL,
      allowNull: true,
    },
    benefit: {
      type: DataTypes.REAL,
      allowNull: true,
    },
  },
  { sequelize }
);

Ingredients.belongsToMany(Foods, { through: FoodByIngredients });
Foods.belongsToMany(Ingredients, { through: FoodByIngredients });

module.exports = Foods;

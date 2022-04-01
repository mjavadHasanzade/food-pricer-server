const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Ingredients = require("../Models/ingredients");
const Foods = require("./foods");

const FoodByIngredients = sequelize.define(
  "FoodByIngredients",
  {
    FoodId: {
      type: DataTypes.INTEGER,
      references: {
        model: Foods,
        key: "id",
      },
    },
    IngredientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Ingredients,
        key: "id",
      },
    },
    IngredientQuantity: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
);

module.exports = FoodByIngredients;

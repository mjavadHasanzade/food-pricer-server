const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Foods = require("./foods");
const Menus = require("./menus");

const MenuByFoods = sequelize.define(
  "MenuByFoods",
  {
    MenuId: {
      type: DataTypes.INTEGER,
      references: {
        model: Menus,
        key: "id",
      },
    },
    FoodId: {
      type: DataTypes.INTEGER,
      references: {
        model: Foods,
        key: "id",
      },
    },
  },
  { sequelize, timestamps: false }
);

module.exports = MenuByFoods;

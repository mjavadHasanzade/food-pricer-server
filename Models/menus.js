const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Foods = require("./foods");
const MenuByFoods = require("./menuByFood");

const Menus = sequelize.define(
  "Menus",
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
    isActiveMenu: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize }
);

Menus.belongsToMany(Foods, { through: "MenuByFoods" });
Foods.belongsToMany(Menus, { through: "MenuByFoods" });

module.exports = Menus;

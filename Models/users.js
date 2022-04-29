const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Foods = require("./foods");
const Ingredients = require("./ingredients");
const Menus = require("./menus");

const Users = sequelize.define("Users", {
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
  family: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: false,
  },
});

Users.hasMany(Ingredients);
Users.hasMany(Foods);
Users.hasMany(Menus);

Ingredients.belongsTo(Users);
Foods.belongsTo(Users);
Menus.belongsTo(Users);

module.exports = Users;

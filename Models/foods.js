const { DataTypes } = require("sequelize/types");
const sequelize = require("../database");

const Foods = sequelize.define(
  "Foods",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
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

module.exports = Foods;

const { DataTypes } = require("sequelize/types");
const sequelize = require("../database");

const Menues = sequelize.define(
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
    foods: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.NUMBER,
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

module.exports = Menues;

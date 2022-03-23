const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("food-pricer", "user", "pass", {
  dialect: "sqlite",
  host: "./dev.sqlite",
});

module.exports = sequelize;

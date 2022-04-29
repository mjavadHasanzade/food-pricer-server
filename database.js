const { Sequelize } = require("sequelize");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASS,
  {
    dialect: "mysql",
    host: process.env.HOST,
    port: process.env.DBPORT,
  }
);

module.exports = sequelize;

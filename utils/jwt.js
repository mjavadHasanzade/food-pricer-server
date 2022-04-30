const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

function jwt(token, type, action) {
  if (action === "verify")
    return jsonwebtoken.verify(
      token,
      type === "user" ? process.env.userJwtKey : process.env.adminJwtKey
    );

  return jsonwebtoken.sign(
    token,
    type === "user" ? process.env.userJwtKey : process.env.adminJwtKey
  );
}

module.exports = jwt;

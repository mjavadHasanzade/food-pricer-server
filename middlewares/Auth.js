const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("x-auth");
  if (!token) return res.status(401).send({ message: "Access Denied !!!" });

  try {
    const user = jwt.verify(token, process.env.userJwtKey);
    req.user = user;
    
    next();
  } catch (ex) {
    return res.status(401).send({ message: "Access Denied !!!" });
  }
};

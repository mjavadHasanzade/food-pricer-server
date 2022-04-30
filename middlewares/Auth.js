const jwt = require("../utils/jwt");

module.exports = function (req, res, next) {
  const token = req.header("x-auth");
  if (!token) return res.status(401).send({ message: "Access Denied !!!" });

  try {
    const user = jwt(token, "user", "verify");
    req.user = user;

    next();
  } catch (ex) {
    return res.status(401).send({ message: "Access Denied !!!" });
  }
};

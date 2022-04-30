const Users = require("../Models/users");
const jwt = require("jsonwebtoken");
const userValidator = require("../validators/user");

const register = async (req, res) => {
  const { error } = userValidator(req, "register");

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  try {
    const user = await Users.create(req.body);

    res.status(200).send({
      message: "Successfully Registered",
      token: jwt.sign({ userId: user.id }, process.env.userJwtKey),
    });
  } catch (error) {
    if (error.name == "SequelizeUniqueConstraintError")
      return res.status(401).send({ message: "Email is Already Signed in" });

    return res.status(500).send({ message: "Something Went Wrong. Try Again" });
  }
};
const login = async (req, res) => {
  const { error } = userValidator(req, "login");

  if (error) {
    return res.status(400).send({ message: error.message });
  }
  const user = await Users.findOne({ where: { email: req.body.email } });
  if (!user) {
    res.status(404).send({ message: "User Not found!!! Login First" });
    return;
  }

  if (user.password !== req.body.password) {
    res.status(401).send({ message: "Incorrect Password!!!" });
    return;
  }

  res.status(200).send({
    message: "Successfully Login ",
    token: jwt.sign({ userId: user.id }, process.env.userJwtKey),
  });
};

module.exports = {
  register,
  login,
};

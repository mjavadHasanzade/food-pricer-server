const { register, login } = require("../Controllers/user");
const router = require("express").Router();
// const pagination = require('../middlewars/pagination');

router.post("/register", register);
router.post("/login", login);

module.exports = router;

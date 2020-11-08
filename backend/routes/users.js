var express = require('express');
var router = express.Router();
var { register, login, logout } = require("../controller/user");
const { validateToken } = require('../middleware/authentication');

router.post("/", register);
router.post("/login", login);
router.delete("/logout", validateToken, logout);
module.exports = router;

const express = require("express");
const { createUser, login } = require("../controller/user.controller");

const router = express.Router();

router.post("/createUser", createUser);
router.post("/login", login);

module.exports = router;

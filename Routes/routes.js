const express = require("express");
const router = express.Router();

const {login} = require("../Controllers/login");
const {signup} = require("../Controllers/signup");

router.post("/signup",signup);
router.post("/login",login);

module.exports = router;
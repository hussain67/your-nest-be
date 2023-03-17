const express = require("express");
const route = express.Router();
const { preRegister, register } = require("../controllers/authController");

route.post("/pre-register", preRegister);
route.post("/register", register);

module.exports = route;

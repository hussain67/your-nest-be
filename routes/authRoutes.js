const express = require("express");
const route = express.Router();
const { preRegister, register, login } = require("../controllers/authController");

route.post("/pre-register", preRegister);
route.post("/register", register);
route.post("/login", login);

module.exports = route;

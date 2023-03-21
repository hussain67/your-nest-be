const express = require("express");
const route = express.Router();
const { preRegister, register, login, forgotPassword } = require("../controllers/authController");

route.post("/pre-register", preRegister);
route.post("/register", register);
route.post("/login", login);
route.post("/forgot-password", forgotPassword);

module.exports = route;

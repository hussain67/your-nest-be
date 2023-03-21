const express = require("express");
const route = express.Router();
const { preRegister, register, login, forgotPassword, accessAccount, refreshToken } = require("../controllers/authController");

route.post("/pre-register", preRegister);
route.post("/register", register);
route.post("/login", login);
route.post("/forgot-password", forgotPassword);
route.post("/access-account", accessAccount);
route.post("/refresh-token", refreshToken);

module.exports = route;

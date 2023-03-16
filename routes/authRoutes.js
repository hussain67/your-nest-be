const express = require("express");
const route = express.Router();
const { preRegister } = require("../controllers/authController");

route.post("/pre-register", preRegister);

module.exports = route;

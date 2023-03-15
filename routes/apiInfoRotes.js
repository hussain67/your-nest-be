const express = require("express");
const route = express.Router();

const apiInfoController = require("../controllers/apiInfoController");

route.get("/", apiInfoController);

module.exports = route;

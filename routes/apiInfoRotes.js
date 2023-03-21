const express = require("express");
const route = express.Router();
const { requireSignin } = require("../middlewares/authMiddleware");

const apiInfoController = require("../controllers/apiInfoController");

route.get("/welcome", requireSignin, apiInfoController);

module.exports = route;

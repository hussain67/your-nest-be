const express = require("express");
const route = express.Router();

const { uploadImage } = require("../controllers/adController");
const { requireSignin } = require("../middlewares/authMiddleware");

route.post("/upload-image", requireSignin, uploadImage);

module.exports = route;

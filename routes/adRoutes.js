const express = require("express");
const route = express.Router();

const { uploadImage, removeImage, createAd, getAds, getAd, contactSeller } = require("../controllers/adController");
const { requireSignin } = require("../middlewares/authMiddleware");

route.post("/upload-image", requireSignin, uploadImage);
route.post("/remove-image", requireSignin, removeImage);
route.post("/create-ad", requireSignin, createAd);
route.get("/get-ads", getAds);
route.get("/get-ad/:slug", getAd);

route.post("/contact-seller", requireSignin, contactSeller);

module.exports = route;

const express = require("express");
const route = express.Router();

const { uploadImage, removeImage, createAd, updateAd, deleteAd, getAds, getAd, contactSeller, userAds } = require("../controllers/adController");
const { requireSignin } = require("../middlewares/authMiddleware");

route.post("/upload-image", requireSignin, uploadImage);
route.post("/remove-image", requireSignin, removeImage);
route.post("/create-ad", requireSignin, createAd);
route.put("/update-ad/:_id", requireSignin, updateAd);
route.delete("/delete-ad/:_id", requireSignin, deleteAd);
route.get("/get-ads", getAds);
route.get("/get-ad/:slug", getAd);
route.post("/contact-seller", requireSignin, contactSeller);
route.get("/user-ads/:page", requireSignin, userAds);

module.exports = route;

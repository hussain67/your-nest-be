const express = require("express");
const route = express.Router();
const { preRegister, register, login, currentUser, forgotPassword, accessAccount, refreshToken, setupDatabase, publicProfile } = require("../controllers/authController");
const { requireSignin } = require("../middlewares/authMiddleware");

route.post("/setupDb", setupDatabase);
route.post("/pre-register", preRegister);
route.post("/register", register);
route.post("/login", login);
route.get("/current-user", requireSignin, currentUser);
route.get("/refresh-token", refreshToken);
route.post("/forgot-password", forgotPassword);
route.post("/access-account", accessAccount);
route.post("/profile/:username", publicProfile);

module.exports = route;

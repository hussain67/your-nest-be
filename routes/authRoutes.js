const express = require("express");
const route = express.Router();

route.get("/auth", (req, res) => {
	return res.status(200).json({
		data: "Welcome to auth route"
	});
});

module.exports = route;

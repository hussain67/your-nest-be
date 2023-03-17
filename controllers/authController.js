require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const User = require("../models/authModels");
const { AWSSES, CLIENT_URL, REPLY_TO } = require("../config");
const emailTemplate = require("../utils/email");
const { hashPassword, comparePassword } = require("../utils/auth");

const preRegister = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			return res.json({ error: "Email is already taken" });
		}
		const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: "1h" });
		AWSSES.sendEmail(
			emailTemplate(email, ` <a href= "${CLIENT_URL}/api/v1/auth/account-activate/${token}">   Activate  account  </a>`, REPLY_TO, "Activate account"),

			(err, data) => {
				if (err) {
					console.log(err);
					return res.json({ OK: false });
				} else {
					console.log(data);
					return res.json({ OK: true });
				}
			}
		);
	} catch (err) {
		return res.json({ error: "Something went wrong, try again latter " });
	}
};
const register = async (req, res) => {
	try {
		console.log(req.body);
		const { email, password } = jwt.verify(req.body.token, process.env.JWT_SECRET);
		const hashedPassword = await hashPassword(password);
		const user = await new User({
			name: uuidv4(),
			email,
			password: hashedPassword
		});
		user.save();
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
		const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

		user.password = undefined;
		return res.json({
			token,
			refreshToken,
			user
		});
	} catch (error) {
		console.log(error);
		return res.json({ error: "Something went wrong, try again latter " });
	}
};

module.exports = { preRegister, register };

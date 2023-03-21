require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const User = require("../models/authModels");
const { AWSSES, CLIENT_URL, REPLY_TO } = require("../config");
const emailTemplate = require("../utils/email");
const { hashPassword, comparePassword, tokenAndUserResponse } = require("../utils/auth");

const preRegister = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (user) {
			return res.json({ error: "Email is already taken" });
		}
		const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: "1h" });
		AWSSES.sendEmail(
			emailTemplate(
				email,
				` 
				<p> Please click the link below to activate your account </p>
				<a href= "${CLIENT_URL}/api/v1/auth/account-activate/${token}">   Activate  account  </a>
			`,
				REPLY_TO,
				"Activate account"
			),

			(err, data) => {
				if (err) {
					console.log(err);
					return res.json({ status: false });
				} else {
					console.log(data);
					return res.json({ status: true });
				}
			}
		);
	} catch (err) {
		return res.json({ error: "Something went wrong, try again latter " });
	}
};
const register = async (req, res) => {
	try {
		const { email, password } = jwt.verify(req.body.token, process.env.JWT_SECRET);

		const hashedPassword = await hashPassword(password);
		const user = await new User({
			name: uuidv4(),
			email,
			password: hashedPassword
		}).save();
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
		const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

		user.password = undefined;
		user.resetCode = undefined;
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

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find the user with email
		const user = await User.findOne({ email });

		// Compare password
		const match = await comparePassword(password, user.password);
		if (!match) {
			return res.json({ error: "Password do not match" });
		}
		tokenAndUserResponse(res, user);
	} catch (error) {
		console.log(error);
		return res.json({ error: "Something went wrong, try again latter " });
	}
};
const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		const resetCode = uuidv4();
		user.resetCode = resetCode;
		user.save();
		const token = jwt.sign({ email, resetCode }, process.env.JWT_SECRET, { expiresIn: "1h" });
		AWSSES.sendEmail(
			emailTemplate(
				email,
				`<p> Please click the link below to access your account </p>
			 <a href="${CLIENT_URL}/api/v1/auth/access-account/${token}"> Access my account  </a>
		
		`,
				REPLY_TO,
				"Access your account"
			),
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
	} catch (error) {
		console.log(error);
		return res.json({ error: "Something went wrong, try again latter " });
	}
};

const accessAccount = async (req, res) => {
	try {
		const { resetCode } = jwt.verify(req.body.resetCode, process.env.JWT_SECRET);
		const user = await User.findOneAndUpdate({ resetCode }, { resetCode: "" });
		tokenAndUserResponse(res, user);
	} catch (error) {
		return res.json({ error: "Something went wrong, try again latter " });
	}
};
const refreshToken = async (req, res) => {
	try {
		const { _id } = jwt.verify(req.header.refresh_token, process.env.JWT_SECRET);
		const user = User.findById({ _id });
		tokenAndUserResponse(res, user);
	} catch (error) {
		return res.json({ error: "Refresh token failed" });
	}
};
module.exports = { preRegister, register, login, forgotPassword, accessAccount, refreshToken };

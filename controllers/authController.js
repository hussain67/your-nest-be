require("dotenv").config();
const { MailtrapClient } = require("mailtrap");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const User = require("../models/authModels");

const { hashPassword, comparePassword, tokenAndUserResponse } = require("../utils/auth");

//const sendEmailMailtrap = require("../utils/mailtrap");
const emailEthereal = require("../utils/emailEthereal");
const { AWSSES, CLIENT_URL, REPLY_TO } = require("../config");
const emailTemplate = require("../utils/emailTemplate");

//const setupDatabase = require("../db/seed-test");

const preRegister = async (req, res) => {
	try {
		const { name, email, password, type } = req.body;

		const userExist = await User.findOne({ email });
		if (userExist) {
			return res.json({ error: "Email is already taken" });
		}
		const token = jwt.sign({ name, email, password }, process.env.JWT_SECRET, { expiresIn: "1h" });
		//sendEmailMailtrap();

		if (type === "test") {
			return res.json({ token });
		}
		const subject = "Email verification";

		const TOKEN = "7d51ae55e11c338be1c184a0ff1851e2";
		const ENDPOINT = "https://send.api.mailtrap.io/";

		const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

		const sender = {
			email: "mailtrap@your-nest.mdshahid.org",
			name: "Mailtrap Test"
		};
		const recipients = [
			{
				email: "shahidshahnoor67@gmail.com"
			}
		];

		client
			.send({
				from: sender,
				to: recipients,
				subject: "You are awesome!",
				text: "Congrats for sending test email with Mailtrap!",
				category: "Integration Test"
			})
			.then(console.log, console.error);

		// EMAIL VARIFICATION WITH AWS SES
		// AWSSES.sendEmail(
		// 	emailTemplate(
		// 		email,
		// 		`
		// 		<p> Please click the link below to activate your account </p>
		// 		<a href= "${CLIENT_URL}/auth/account-activate/${token}">   Activate  account  </a>
		// 	`,
		// 		REPLY_TO,
		// 		"Activate account"
		// 	),

		// 	(err, data) => {
		// 		if (err) {
		// 			//console.log(err);
		// 			return res.json({ status: "Failed" });
		// 		} else {
		// 			//console.log(data);
		// 			return res.json({ status: "Success" });
		// 		}
		// 	}
		// );
		//*** Email varification with Ethereal */

		// const infoId = await emailEthereal(name, email, subject, token);
		// if (infoId) {
		// 	return res.json({ status: "Success" });
		// }
	} catch (err) {
		return res.json({ error: "Something went wrong, try again latter" });
	}
};
const register = async (req, res) => {
	try {
		const { name, email, password } = jwt.verify(req.body.token, process.env.JWT_SECRET);
		const userExist = await User.findOne({ email });
		if (userExist) {
			return res.json({ error: "Email is already taken" });
		}
		const hashedPassword = await hashPassword(password);
		const user = await new User({
			username: uuidv4(),
			name,
			email,
			password: hashedPassword
		}).save();
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
		const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

		user.password = undefined;
		user.resetCode = undefined;

		return res.status(201).json({
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

		if (!user) {
			return res.status(401).json({ error: "No user found with this email" });
		}

		// Compare password
		const match = await comparePassword(password, user.password);
		if (!match) {
			return res.status(401).json({ error: "Password do not match" });
		}
		tokenAndUserResponse(res, user);
	} catch (error) {
		console.log(error);
		return res.json({ error: "Something went wrong, try again latter " });
	}
};
const currentUser = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (user) {
			return res.json(user);
		} else {
			return res.status(403).json({ error: "Unauthorised" });
		}
	} catch (error) {
		return res.json({ error: "Something went wrong try again latter" });
	}
};
const forgotPassword = async (req, res) => {
	try {
		const { email, type } = req.body;
		const user = await User.findOne({ email });

		//Wrong password
		if (!user) {
			return res.json({ error: "Email do not match!" });
		}
		const resetCode = uuidv4();
		user.resetCode = resetCode;
		user.save();
		const token = jwt.sign({ email, resetCode }, process.env.JWT_SECRET, { expiresIn: "1h" });
		if (type === "test") {
			return res.json({ token });
		}
		AWSSES.sendEmail(
			emailTemplate(
				email,
				`<p> Please click the link below to access your account </p>
			 <a href="${CLIENT_URL}/auth/access-account/${token}"> Access my account  </a>
		
		`,
				//REPLY_TO,
				"Access your account"
			),
			(err, data) => {
				if (err) {
					console.log(err);
					return res.json({ status: "Failed" });
				} else {
					//console.log(data);
					return res.json({ status: "Success" });
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
		const { _id } = jwt.verify(req.headers.refresh_token, process.env.JWT_SECRET);
		const user = await User.findById(_id);
		tokenAndUserResponse(res, user);
	} catch (error) {
		return res.status(403).json({ error: "Refresh token failed" });
	}
};

const setupDatabase = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const hashedPassword = await hashPassword(password);
		await User.deleteMany();
		await new User({ name, email, password: hashedPassword }).save();
		return res.json({ status: "OK" });
	} catch (error) {
		return res.json({ status: "NOT OK" });
	}
};
const publicProfile = async (req, res) => {
	try {
		const user = User.findOne({ username: req.params.username });
		user.password = undefined;
		user.resetCode = undefined;

		res.json(user);
	} catch (error) {
		console.log(error);
		res.json({ error: "User not found" });
	}
};

const updateProfile = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
		user.password = undefined;
		user.resetCode = undefined;
		res.json(user);
	} catch (error) {
		if (error.codeName === "DuplicateKey") {
			return res.json({ error: "Username or email is already taken" });
		} else {
			return res.status(403).json({ error: "Unauhorized" });
		}
	}
};

const updatePassword = async (req, res) => {
	const { password } = req.body;
	console.log(password);

	try {
		const user = await User.findByIdAndUpdate(req.user._id, { password: await hashPassword(password) });
		res.json({ ok: true });
	} catch (error) {
		console.log(error);
	}
};
module.exports = { preRegister, register, login, currentUser, forgotPassword, accessAccount, refreshToken, setupDatabase, publicProfile, updateProfile, updatePassword };

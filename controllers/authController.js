const { AWSSES, CLIENT_URL, REPLY_TO } = require("../config");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const emailTemplate = require("../utils/email");

const preRegister = async (req, res) => {
	try {
		const { email, password } = req.body;
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

module.exports = { preRegister };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = password => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(12, (err, salt) => {
			if (err) {
				reject(err);
			}
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) {
					reject(err);
				}
				resolve(hash);
			});
		});
	});
};

const comparePassword = (password, hashedPassword) => {
	return bcrypt.compare(password, hashedPassword);
};

const tokenAndUserResponse = (res, user) => {
	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
	const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

	user.password = undefined;
	user.resetCode = undefined;
	return res.json({
		token,
		refreshToken,
		user
	});
};

module.exports = { hashPassword, comparePassword, tokenAndUserResponse };

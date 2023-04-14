const User = require("../models/authModels");
const { hashPassword } = require("../utils/auth");

const cleanDatabase = async () => {
	await User.deleteMany();
};

const user1 = {
	name: "shahid",
	email: "hussain.msh67@yahoo.com",
	password: "123456",
	type: "test"
};
const registerUser = async () => {
	await new User({
		name: "shahid",
		email: "hussain.msh67@yahoo.com",
		password: "123456"
	}).save();
};

module.exports = { user1, registerUser, cleanDatabase };

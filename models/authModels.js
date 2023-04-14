//const { model, Schema, ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			default: ""
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true
		},
		password: {
			type: String,
			required: true,
			maxLength: 256
		},
		// verificationToken: String,
		// isVerified: {
		// 	type: Boolean,
		// 	default: false
		// },
		// verified: Date,

		address: { type: String, default: "" },
		company: { type: String, default: "" },
		phone: { type: String, default: "" },
		photo: {},
		role: {
			type: [String],
			default: ["Buyer"],
			enum: ["Buyer", "Seller", "Admin"]
		},
		enquiredProperties: [{ type: mongoose.ObjectId, ref: "Ad" }],
		wishList: [{ type: mongoose.ObjectId, ref: "Ad" }],
		resetCode: { type: String, default: "" }
	},
	{ timeStamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

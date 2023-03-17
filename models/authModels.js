//const { model, Schema, ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			require: true,
			unique: true,
			lowercase: true
		},
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
		wishList: [{ type: mongoose.ObjectId, ref: "Ad" }]
		//resetCode: ""
	},
	{ timeStamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

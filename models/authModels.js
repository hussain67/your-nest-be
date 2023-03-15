const { model, Schema, ObjectId } = require("mongoose");

const userSchema = new Schema(
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
		password: {
			type: String,
			required: true,
			maxlength: 256
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
		enquiredProperties: [{ type: ObjectId, ref: "Ad" }],
		wishList: [{ type: ObjectId, ref: "Ad" }],
		resetCode: ""
	},
	{ timeStamps: true }
);

const User = model("User", userSchema);
module.exports = User;

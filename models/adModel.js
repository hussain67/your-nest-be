const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
	{
		photos: [{}],
		price: { type: Number, maxLength: 255 },
		address: { type: String, maxLength: 255, required: true },
		bedrooms: Number,
		bathrooms: Number,
		landsize: String,

		carpark: Number,
		location: {
			type: {
				type: String,
				enem: ["Point"],
				default: ["Point"]
			},
			coordinates: {
				type: [Number],
				default: [52.486244, -1.890401]
			}
		},
		title: {
			type: String,
			maxLength: 255
		},
		slug: {
			type: String,
			lowercase: true,
			unique: true
		},
		description: {},
		postedBy: {
			type: mongoose.ObjectId,
			ref: "User"
		},
		sold: {
			type: Boolean,
			default: false
		},
		googleMap: [],
		type: {
			type: String,
			default: "Other"
		},
		action: {
			type: String,
			default: "Sell"
		},
		views: {
			type: Number,
			default: 0
		}
	},
	{ timestamps: true }
);

const Ad = mongoose.model("Ad", adSchema);
module.exports = Ad;

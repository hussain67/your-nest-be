const { AWSS3, GOOGLE_GEOCODER } = require("../config");
const { v4: uuidv4 } = require("uuid");
const Ad = require("../models/adModel");
const User = require("../models/authModels");
const slugify = require("slugify");

const uploadImage = async (req, res) => {
	try {
		const { image } = req.body;

		const base64Image = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");
		const type = image.split(";")[0].split("/")[1];

		const params = {
			Bucket: "your-nest-bucket",
			Key: `${uuidv4()}.${type}`,
			Body: base64Image,
			ACL: "public-read",
			ContentEncoding: "base64",
			ContentType: `image/${type}`
		};
		AWSS3.upload(params, (err, data) => {
			if (err) {
				console.log(err);
				res.sendStatus(400);
			} else {
				//console.log(data);
				res.send(data);
			}
		});
	} catch (error) {
		res.json({ error: "Upload failed. Try again" });
	}
};

const removeImage = async (req, res) => {
	const { Bucket, Key } = req.body;

	try {
		AWSS3.deleteObject({ Bucket, Key }, (err, data) => {
			if (err) {
				res.status(400);
			} else {
				res.json({ ok: true });
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const createAd = async (req, res) => {
	console.log(req.headers);
	const { photos, price, address, bedrooms, bathrooms, carparks, landsize, title, description, loading, type, action } = req.body;
	try {
		const slug = slugify(`${type}-${address}-${uuidv4(4)}`);
		//console.log(slug);
		const geo = await GOOGLE_GEOCODER.geocode(address);
		//console.log(geo);
		const ad = await new Ad({
			...req.body,
			postedBy: req.user._id,
			location: {
				type: "Point",
				coordinates: [geo[0].longitude, geo[0].latitude],
				googleMap: geo
			},
			slug: slugify(`${type}-${address}-${uuidv4(4)}`)
		}).save();
		//Make user roll seller
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{
				$addToSet: { role: "Seller" }
			},
			{ new: true }
		);
		user.password = undefined;
		user.resetCode = undefined;
		return res.json({
			ad,
			user
		});
	} catch (error) {
		res.json({ error: "Something went wrong. Try again." });
		console.log(error);
	}
};
const getAds = async (req, res) => {
	try {
		const sellAds = await Ad.find({ action: "Sell" }).select("-googleMap -location -photos.Key -photos.key -photos.ETag ").sort({ createdAt: -1 }).limit(12);
		const rentAds = await Ad.find({ action: "Rent" }).select("-googleMap -location -photos.Key -photos.key -photos.ETag ").sort({ createdAt: -1 }).limit(12);
		res.json({ sellAds, rentAds });
	} catch (error) {
		console.log(error);
	}
};
module.exports = { uploadImage, removeImage, createAd, getAds };

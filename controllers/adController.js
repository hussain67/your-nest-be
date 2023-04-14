const { AWS3 } = require("../config");
const { v4: uuidv4 } = require("uuid");

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
		AWS3.upload(params, (err, data) => {
			if (err) {
				console.log(err);
				res.sendStatus(400);
			} else {
				console.log(data);
				res.send(data);
			}
		});
	} catch (error) {
		res.json({ error: "Upload failed. Try again" });
	}
};

module.exports = { uploadImage };

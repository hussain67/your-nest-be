const apiInfo = (req, res) => {
	return res.status(200).json({
		data: "Welcome to the api info"
	});
};

module.exports = apiInfo;

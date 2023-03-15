const mongoose = require("mongoose");

const connectDb = async databaseUrl => {
	return (
		mongoose
			//.connect("mongodb://127.0.0.1:27017/your-nest")
			.connect(databaseUrl)
			.then(() => {
				console.log("Database connected");
			})
			.catch(err => {
				console.log(err);
			})
	);
};

module.exports = connectDb;

const mongoose = require("mongoose");

const connectDb = async databaseUrl => {
	return mongoose

		.connect(databaseUrl)
		.then(() => {
			console.log("Database connected");
		})
		.catch(err => {
			console.log(err);
		});
};

module.exports = connectDb;

const mongoose = require("mongoose");

const connectDb = async databaseUrl => {
	mongoose.connection.close();
	return await mongoose
		.connect(databaseUrl)
		.then(() => {
			console.log("Database connected");
		})
		.catch(err => {
			console.log(err);
		});
};

module.exports = connectDb;

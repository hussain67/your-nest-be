require("dotenv").config();

const app = require("./server.js");
const connectDb = require("./db/connect");

const { PORT = 8000 } = process.env;

let url;

if (process.env.NODE_ENV === "test") {
	url = process.env.MONGO_URI_TEST;
} else if (process.env.NODE_ENV === "development") {
	url = process.env.MONGO_URI_DEV;
}else{
	url = process.env.MONGO_URI_PROD
}
console.log(url);
connectDb(url);
app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT} `);
});

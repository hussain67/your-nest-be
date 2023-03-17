require("dotenv").config();

const app = require("./server.js");
const connectDb = require("./db/connect");

const { PORT = 8000 } = process.env;

let url;

if (process.env.NODE_ENV === "development ||production") {
	url = "";
} else {
	url = process.env.MONGO_URI;
}

connectDb(url);
app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
});

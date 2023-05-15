const request = require("supertest");
require("dotenv").config();
const app = require("../server");
const url = process.env.MONGO_URI_TEST;
const connectDb = require("../db/connect");
connectDb(url);

const ad1 = {
	price: 10000,
	address: "Frederick road",
	bedRooms: 4,
	bathRooms: 2,
	carPark: 2,
	sold: false,
	action: "Rent"
};
const Ad = require("../models/adModel");
describe("Ad", () => {
	it("create an Ad", async () => {
		const resp = await request(app).post("/api/v1/ad/create-ad").send(ad1);
		console.log(resp.body);
	});
});

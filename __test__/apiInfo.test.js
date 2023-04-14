const request = require("supertest");
require("dotenv").config();
const app = require("../server");
const connectDB = require("../db/connect");
const url = process.env.MONGO_URI_TEST;

//Connect database
//connectDB(url);

describe("Check API info", () => {
	test("It check api is set up properly", async () => {
		const response = await request(app).get("/api/v1/info").expect(200);
		expect(response.body.data).toBe("Welcome to the api info");
	});
});

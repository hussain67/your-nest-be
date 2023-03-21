const request = require("supertest");
require("dotenv").config();
const app = require("../server");
const connectDB = require("../db/connect");
const url = process.env.MONGO_URI_TEST;
connectDB(url);
jest.setTimeout(10000);
const User = require("../models/authModels");
const setupDatabase = async () => {
	await User.deleteMany();
};

beforeEach(setupDatabase);

describe("pre-register user properly", () => {
	it("return status OK when a user pre-register with an email not used already", async () => {
		const response = await request(app).post("/api/v1/auth/pre-register").send({
			email: "hussain.msh67@yahoo.com",
			password: "123456"
		});
		expect(response.body.status).toBe(true);
	});
});

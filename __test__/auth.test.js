const request = require("supertest");
require("dotenv").config();
const app = require("../server");
const connectDB = require("../db/connect");
const url = process.env.MONGO_URI_TEST;
connectDB(url);
//jest.setTimeout(10000);
const User = require("../models/authModels");
const { user1, cleanDatabase, registerUser } = require("../db/seed-test");

beforeEach(cleanDatabase);

describe("register a user properly", () => {
	it("should return status code 201 and  register a new user", async () => {
		//Request to pre-register
		const resp = await request(app).post("/api/v1/auth/pre-register").send(user1);
		const { token } = resp.body;

		//Request to register
		const res = await request(app).post("/api/v1/auth/register").send({
			token
		});

		//Assert that user has been created
		expect(res.status).toBe(201);
		const user = await User.findOne({ email: user1.email });
		expect(user).not.toBe(null);
		expect(user.name).toBe(user1.name);

		//Assert that response contains token and refresh tokens
		expect(res.body.token).not.toBe(null);
		expect(res.body.refreshToken).not.toBe(null);

		//Assert that information in response is accurate
		expect(res.body.user.name).toBe("shahid");
	});

	it("return error message when an already used email is used", async () => {
		registerUser();
		const res = await request(app).post("/api/v1/auth/pre-register").send({
			email: "hussain.msh67@yahoo.com",
			password: "123456",
			type: "test"
		});
		expect(res.body.error).toBe("Email is already taken");
	});
});
describe("Login user", () => {
	it("Login a registered user", async () => {
		//Request to pre-register
		const resp = await request(app).post("/api/v1/auth/pre-register").send(user1);
		const { token } = resp.body;

		//Request to register
		const res = await request(app).post("/api/v1/auth/register").send({
			token
		});

		//Confirm that user has been created
		const user = await User.findOne({ email: user1.email });
		expect(user).not.toBe(null);

		//Login user
		const userLogged = await request(app).post("/api/v1/auth/login").send({
			email: user1.email,
			password: user1.password
		});

		//Validate expected user is logged in
		expect(userLogged.body.user.name).toBe(user1.name);

		//Validate tokens are attached to response
		expect(userLogged.body.token).not.toBe(null);
		expect(userLogged.body.refreshToken).not.toBe(null);
	});
	it("should not login non existant user", async () => {
		const res = await request(app).post("/api/v1/auth/login").send({
			email: "non@yahoo.com",
			password: user1.password
		});
		expect(res.status).toBe(401);
		expect(res.body.error).toBe("No user found with this email");
	});
	it("should not login with incorrect password", async () => {
		const res = await request(app).post("/api/v1/auth/login").send({
			email: user1.email,
			password: "incorrect"
		});
		expect(res.status).toBe(401);
		expect(res.body.error).toBe("No user found with this email");
	});
});

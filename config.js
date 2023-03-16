const SES = require("aws-sdk/clients/ses");
require("dotenv").config();

const awsConfig = {
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: "eu-west-1",
	apiVersion: "2010-12-01"
};

const REPLY_TO = "hussain.msh67@yahoo.com";
const CLIENT_URL = "http://localhost:3000";

const AWSSES = new SES(awsConfig);
module.exports = { AWSSES, CLIENT_URL, REPLY_TO };

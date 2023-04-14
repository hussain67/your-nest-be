const SES = require("aws-sdk/clients/ses");
const S3 = require("aws-sdk/clients/s3");
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
const AWS3 = new S3(awsConfig);
module.exports = { AWSSES, AWS3, CLIENT_URL, REPLY_TO };

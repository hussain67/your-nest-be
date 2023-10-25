const SES = require("aws-sdk/clients/ses");
const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();
const NodeGeocoder = require("node-geocoder");

const awsConfig = {
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: "eu-west-1",
	apiVersion: "2010-12-01"
};
const EMAIL_FROM = "hussain.msh67@yahoo.com";
const REPLY_TO = "hussain.msh67@yahoo.com";
const CLIENT_URL = process.env.CLIENT_URL;

const GOOGLE_GEOCODER = NodeGeocoder({
	provider: "google",

	// Optional depending on the providers
	//fetch: customFetchImplementation,
	apiKey: process.env.GOOGLE_KEY, // for Mapquest, OpenCage, Google Premier
	formatter: null
});

const AWSSES = new SES(awsConfig);
const AWSS3 = new S3(awsConfig);
module.exports = { AWSSES, AWSS3, CLIENT_URL, GOOGLE_GEOCODER, REPLY_TO, EMAIL_FROM };

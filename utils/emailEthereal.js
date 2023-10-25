const nodemailer = require("nodemailer");
const { CLIENT_URL } = require("../config");
const style = `
      background: pink;
       padding:20px;
      border-radius:10px;
     `;

const emailEthereal = async (name, emailTo, subject, token) => {
	const content = ` 

	<div style="${style}"> 	
		<h1>Hello ${name}   </h1>
		<p> Please click the link below to activate your account </p>
		<a href= "${CLIENT_URL}/auth/account-activate/${token}">   Activate  account  </a>
		</div>
	`;

	let testAccount = await nodemailer.createTestAccount();
	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		auth: {
			user: "olaf.halvorson25@ethereal.email",
			pass: "14Xa62jkeeQDn9hw3T"
		}
	});

	const info = await transporter.sendMail({
		from: `"Shahid 👻" "<shahidshahnoor67@gmail.com>"`, // sender address
		to: emailTo, // list of receivers
		subject, // Subject line

		html: content // html body
	});
	console.log(info);
	return info.messageId;
};
module.exports = emailEthereal;

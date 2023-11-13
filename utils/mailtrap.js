import { MailtrapClient } from "mailtrap";

/**
 * For this example to work, you need to set up a sending domain,
 * and obtain a token that is authorized to send from the domain.
 */

const TOKEN = "7d51ae55e11c338be1c184a0ff1851e2";
const SENDER_EMAIL = "<your-nest.mdshahid.org>";
const RECIPIENT_EMAIL = "<hussain.msh67@yahoo.com>";

const client = new MailtrapClient({ token: TOKEN });

const sender = { name: "Mailtrap Test", email: SENDER_EMAIL };

client
	.send({
		from: sender,
		to: [{ email: RECIPIENT_EMAIL }],
		subject: "Hello from Mailtrap!",
		text: "Welcome to Mailtrap Sending!"
	})
	.then(console.log)
	.catch(console.error);
// const { MailtrapClient } = require("mailtrap");

// const sendEmailMailtrap = () => {
// 	const client = new MailtrapClient({ token: "4bcfc9a3b1079e0f4afb60d12b659064" });

// 	client
// 		.send({
// 			from: { email: "info@mailtrap.com" },
// 			to: [{ email: "hussain.msh67@yahoo.com" }],
// 			subject: "Hello from Mailtrap!",
// 			text: "Welcome to Mailtrap Sending!"
// 		})
// 		.then(console.log)
// 		.catch(console.error);
// };

// module.exports = sendEmailMailtrap;

const { MailtrapClient } = require("mailtrap");

const sendEmailMailtrap = () => {
	const client = new MailtrapClient({ token: "4bcfc9a3b1079e0f4afb60d12b659064" });

	client
		.send({
			from: { email: "info@mailtrap.com" },
			to: [{ email: "hussain.msh67@yahoo.com" }],
			subject: "Hello from Mailtrap!",
			text: "Welcome to Mailtrap Sending!"
		})
		.then(console.log)
		.catch(console.error);
};

module.exports = sendEmailMailtrap;

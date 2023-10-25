const style = `
      background: pink;
       padding:20px;
      border-radius:10px;
     `;

const emailTemplate = (email, content, returnTo, subject) => {
	return {
		Source: process.env.EMAIL_FROM,

		Destination: {
			ToAddresses: [email]
		},
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: `
               <html>   
                    <div style ="${style}">
							<h1> Welcome to Your-Nest</h1> 
							
							${content}
                   </div>
            </html>
            `
				}
			},
			Subject: {
				Charset: "UTF-8",
				Data: subject
			}
		}
	};
};

module.exports = emailTemplate;

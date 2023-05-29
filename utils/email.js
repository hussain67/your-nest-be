const style = `
      background: pink;
       padding:20px;
      border-radius:10px;
     `;

const emailTemplate = (emailFrom, emailTo, content, subject) => {
	return {
		Source: emailFrom,

		Destination: {
			ToAddresses: [emailTo]
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

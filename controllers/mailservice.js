const nodemailer = require('nodemailer')


const postmail = async(req,res)=>{
	
	const nodemailer = require('nodemailer');

	const transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    type: 'OAuth2',
	    user: process.env.EMAIL,
	    pass: process.env.PASSWORD,
	    clientId: process.env.CLIENT_ID,
	    clientSecret: process.env.CLIENT_SECRET,
	    refreshToken: process.env.REFRESH_TOKEN
	  }
	});

	const mailConfigurations = {
  
    // It should be a string of sender email
    from: 'dudianand@gmail.com',
      
    // Comma Separated list of mails
    to: 'dudis.vision@gmail.com',
  
    // Subject of Email
    subject: 'Sending Email using Node.js',
      
    // This would be the text of email body
    text: 'Hi! There, You know I am using the'
      + ' NodeJS Code along with NodeMailer '
      + 'to send this email. yooooooooooo man'
};

console.log("for dummy branch")

transporter.sendMail(mailConfigurations, function(error, info){
    if (error){
    	return res.status(401).json({Error:error})
    };
    res.send(info)
});

}

module.exports = postmail
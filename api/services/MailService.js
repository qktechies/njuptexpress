var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
	service: 'qq',
	auth: {
		user: '996902001@qq.com',
		pass: 'qtyyxe2011'
	}
});

module.exports = {
	sendMail: function(token, username, cb) {
		// setup e-mail data with unicode symbols
		var mailOptions = {
			from: '996902001@qq.com', // sender address
			to: username, // list of receivers
			subject: '快递验证码', // Subject line
			text: 'Hello world ✔', // plaintext body
			html: '你修改密码的验证码是:<h1>' + token + '</h1>' // html body
		};

		transporter.sendMail(mailOptions, function(error, info) {
			cb(error)
		});
	}
}
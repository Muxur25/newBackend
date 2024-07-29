const nodemailer = require('nodemailer')

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_EMAIL,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}

	async sendMail(email, activationLink) {
		await this.transporter.sendMail({
			from: process.env.SMTP_EMAIL,
			to: email,
			subject: `Activate accaunt link ${activationLink}`,
			html: `
				<div>
					<a href="${activationLink}">Link me</a>
				</div>
			`,
		})
	}
}

module.exports = new MailService()

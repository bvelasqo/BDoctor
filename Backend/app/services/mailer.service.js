const nodemailer = require("nodemailer");
const config = require("../config/index");
class mailerService {
    constructor() {
        this.config_transport();
        this.sender = `"BDoctor" <${config.mailer_sender}>`;
    }

    async _config_transport() {
        this.sender = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: config.mailer_sender,
                pass: config.mailer_sender
            },
        });
    }
    async sendMessage(addressee, subject, body) {
        await this.transport.sendMail({
            from: this.sender,
            to: addressee,
            subject: subject,
            html: body,
        });
    }
}

module.exports = mailerService;
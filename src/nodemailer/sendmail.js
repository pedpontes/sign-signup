const nodemailer = require("nodemailer");
const config = require("./configMail.json")

const sendMailer = (props) => {
    console.log(config);
    const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        auth: {
            user: config.username,
            pass: config.password
        }
    })
    const mailoptions = {
        from: config.from,
        to: props.to,
        subject: props.subject,
        text: props.text
    }

    transporter.sendMail(mailoptions, (err, res) => {
        console.log(err ? err : "Email sent successfully");
    });

    transporter.close();

    return;
}
module.exports = { sendMailer };
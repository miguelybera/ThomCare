const nodemailer = require('nodemailer')

const sendForgotPassword = async options => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD 
        }
    })

    const message = {
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: options.message
    }

    await transport.sendMail(message)
}

module.exports = sendForgotPassword
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (receiver, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS,
        },
    });
    try {
        await transporter.sendMail({
            from: {
                name: "Roller Manager",
                address: process.env.MAIL,
            },
            to: receiver,
            subject: subject,
            html: html,
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = sendMail;

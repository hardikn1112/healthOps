const nodemailer = require('nodemailer');
const express = require('express');
require('dotenv').config();

module.exports = async function sendEmail(mailPayload){
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASS
        }
    });

    let mail = await transporter.sendMail({
        from: process.env.MAIL_ID,
        to: mailPayload.to,
        subject: mailPayload.subject,
        text: mailPayload.body
    });

    console.log('Email sent...', mail.messageId, mailPayload.to);
}


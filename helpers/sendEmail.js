const nodemailer = require("nodemailer");


const {EMAIL_PASSWORD} = process.env;

const nodemailerConfig = {
  service: 'gmail',
  auth: {
    user: 'tt10392@gmail.com',
    pass: EMAIL_PASSWORD
  }
};

const transport = nodemailer.createTransport(nodemailerConfig);


const sendEmail = async(data) => {

  await transport.sendMail({...data, from: "tt10392@gmail.com'"})

  return true
}

module.exports = sendEmail;
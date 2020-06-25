const nodemailer = require('nodemailer')
require('dotenv').config()
const credentials = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.email,
    pass: process.env.acc_password
  }
}
const transporter = nodemailer.createTransport(credentials)


module.exports = async (to, content) => {
    const contacts = {
        from: process.env.email,
        to
    }
    const email = Object.assign({}, content, contacts)

    await transporter.sendMail(email)


}
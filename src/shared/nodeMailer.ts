const nodemailer = require('nodemailer');
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'butterflynso9797@gmail.com', // Your Gmail address
    pass: 'pqfn hfly gpmy ednj', // App Password or your Gmail password
  },
});

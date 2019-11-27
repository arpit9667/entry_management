const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.USER_NAME,
      pass: process.env.USER_PASSWORD
    }
});

const sendmail = (mailOptions) => {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendmail